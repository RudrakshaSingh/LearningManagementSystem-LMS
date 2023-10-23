import Payment from "../models/paymentModel";
import User from "../models/userModel";
import { razorpay } from "../server";
import AppError from "../utilityFunctions/errorUtil";

export const getRazorpayApiKey = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Razorpay API key",
        key: process.env.RAZORPAY_KEY_ID,
    });
};

export const buySubscription = async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
        return next(new AppError("unauthorized,please login"));
    }

    if (user.role === "ADMIN") {
        return next(new AppError("Admin cannot purchase a subscription"));
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

    // Saving/storing the user object
    await user.save();

    res.status(200).json({
        success: true,
        message: "subscribed successfully",
        subscription_id: subscription.id,
    });
};

export const verifySubscription = async (req, res, next) => {
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
        razorpay_signature,
        razorpay_subscription_id,
    });

    // Update the user subscription status to active (This will be created before this)
    user.subscription.status = "active";

    // Save the user in the DB with any changes
    await user.save();

    res.status(200).json({
        success: true,
        message: "Payment verified successfully",
    });
};

export const cancelSubscription = async (req, res, next) => {};

export const allPayments = async (req, res, next) => {};
