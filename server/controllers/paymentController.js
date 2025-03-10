import crypto from "crypto";

import asyncHandler from "../middlewares/asyncHandlerMiddleware.js";

import Payment from "../models/paymentModel.js";
import User from "../models/userModel.js";
import { razorpay } from "../server.js";

import AppError from "../utilityFunctions/errorUtil.js";

/**
 * @ACTIVATE_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/subscribe
 * @ACCESS Private (Logged in user only)
 */
export const buySubscription = asyncHandler(async (req, res, next) => {
    // Extracting ID from request obj
    const { id } = req.user;

    // Finding the user based on the ID
    const user = await User.findById(id);

    if (!user) {
        return next(new AppError("Unauthorized, please login"));
    }

    // Checking the user role
    if (user.role === "ADMIN") {
        return next(new AppError("Admin cannot purchase a subscription", 400));
    }

    // Creating a subscription using razorpay that we imported from the server
    const subscription = await razorpay.subscriptions.create({
        plan_id: process.env.RAZORPAY_PLAN_ID, // The unique plan ID
        customer_notify: 1, // 1 means razorpay will handle notifying the customer, 0 means we will not notify the customer
        total_count: 12, // 12 means it will charge every month for a 1-year sub.
    });

    // Adding the ID and the status to the user account
    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    // Saving the user object
    await user.save();

    res.status(200).json({
        success: true,
        message: "subscribed successfully",
        subscription_id: subscription.id,
    });
});

/**
 * @VERIFY_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/verify
 * @ACCESS Private (Logged in user only)
 */
export const verifySubscription = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;

    // Finding the user
    const user = await User.findById(id);

    // Getting the subscription ID from the user object
    const subscriptionId = user.subscription.id;

    // Generating a signature with SHA256 for verification purposes
    // Here the subscriptionId should be the one which we saved in the DB
    // razorpay_payment_id is from the frontend and there should be a '|' character between this and subscriptionId
    // At the end convert it to Hex value
    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(`${razorpay_payment_id}|${subscriptionId}`)
        .digest("hex");

    // Check if generated signature and signature received from the frontend is the same or not
    if (generatedSignature !== razorpay_signature) {
        return next(new AppError("Payment not verified, please try again.", 400));
    }

    // If they match create payment and store it in the DB
    await Payment.create({
        razorpay_payment_id,
        razorpay_subscription_id,
        razorpay_signature,
    });

    // Update the user subscription status to active (This will be created before this)
    user.subscription.status = "active";
    // Save the user in the DB with any changes
    const u = await user.save();
    res.status(200).json({
        success: true,
        message: "Payment verified successfully",
    });
});

/**
 * @CANCEL_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/unsubscribe
 * @ACCESS Private (Logged in user only)
 */
export const cancelSubscription = asyncHandler(async (req, res, next) => {
    const { id } = req.user;

    // Finding the user
    const user = await User.findById(id);

    // Checking the user role
    if (user.role === "ADMIN") {
        return next(new AppError("Admin does not need to cannot cancel subscription", 400));
    }

    // Finding subscription ID from subscription
    const subscriptionId = user.subscription.id;

    // Creating a subscription using razorpay that we imported from the server
    try {
        const subscription = await razorpay.subscriptions.cancel(
            subscriptionId // subscription id
        );

        // Adding the subscription status to the user account
        user.subscription.status = subscription.status;

        // Saving the user object
        await user.save();
    } catch (error) {
        // Returning error if any, and this error is from razorpay so we have statusCode and message built in
        return next(new AppError(error.error.description, error.statusCode));
    }

    // Finding the payment using the subscription ID
    const payment = await Payment.findOne({
        razorpay_subscription_id: subscriptionId,
    });
    // Getting the time from the date of successful payment (in milliseconds)
    const timeSinceSubscribed = Date.now() - payment.createdAt;

    // refund period which in our case is 14 days
    const refundPeriod = 14 * 24 * 60 * 60 * 1000;

    // Check if refund period has expired or not
    if (refundPeriod <= timeSinceSubscribed) {
        return next(new AppError("Refund period is over, so there will not be any refunds provided.", 400));
    }

    // If refund period is valid then refund the full amount that the user has paid
    await razorpay.payments.refund(payment.razorpay_payment_id, {
        speed: "optimum", // This is required
    });

    user.subscription.id = undefined; // Remove the subscription ID from user DB
    user.subscription.status = undefined; // Change the subscription Status in user DB

    await user.save();
    await payment.deleteOne();

    // Send the response
    res.status(200).json({
        success: true,
        message: "Subscription canceled successfully",
    });
});

/**
 * @GET_RAZORPAY_ID
 * @ROUTE @POST {{URL}}/api/v1/payments/razorpay-key
 * @ACCESS Public
 */
export const getRazorpayApiKey = asyncHandler(async (_req, res, _next) => {
    res.status(200).json({
        success: true,
        message: "Razorpay API key",
        key: process.env.RAZORPAY_KEY_ID,
    });
});

/**
 * @GET_RAZORPAY_ID
 * @ROUTE @GET {{URL}}/api/v1/payments
 * @ACCESS Private (ADMIN only)
 */

export const allPaymentsOfCurrentYear = asyncHandler(async (req, res, _next) => {
    const { count, skip } = req.query;

    // Fetch up to 1000 subscriptions from Razorpay
    const allSubscriptions = await razorpay.subscriptions.all({
        plan_id: process.env.RAZORPAY_PLAN_ID,
        count: count ? count : 10, // If count is sent then use that else default to 10
        skip: skip ? skip : 0, // If skip is sent then use that else default to 0
    });

    // Define the current year's start and end timestamps in seconds
    const currentYear = new Date().getFullYear();
    const startOfYear = Math.floor(new Date(currentYear, 0, 1).getTime() / 1000); // January 1st
    const endOfYear = Math.floor(new Date(currentYear, 11, 31, 23, 59, 59).getTime() / 1000); // December 31st

    // Filter subscriptions to those that started in the current year and are not cancelled
    const currentYearSubscriptions = allSubscriptions.items.filter(
        (sub) => sub.start_at >= startOfYear && sub.start_at <= endOfYear && sub.status !== "cancelled"
    );

    // Define month names for mapping
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Initialize monthly counts for all 12 months
    const finalMonths = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
    };

    // Calculate monthly counts based on filtered subscriptions
    currentYearSubscriptions.forEach((payment) => {
        const date = new Date(payment.start_at * 1000); // Convert Unix timestamp to Date object
        const month = monthNames[date.getMonth()];
        finalMonths[month] += 1;
    });

    // Convert monthly counts to an array for monthlySalesRecord
    const monthlySalesRecord = Object.values(finalMonths);

    // Construct the allPayments object with filtered subscriptions
    const allPayments = {
        entity: allSubscriptions.entity,
        count: currentYearSubscriptions.length,
        items: currentYearSubscriptions,
    };
    // Send the response
    res.status(200).json({
        success: true,
        message: "All payments for current year",
        allPayments,
        finalMonths,
        monthlySalesRecord,
    });
});
