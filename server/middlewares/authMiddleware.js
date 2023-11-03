import User from "../models/userModel.js";
import AppError from "../utilityFunctions/errorUtil.js";
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandlerMiddleware.js";

const isLoggedIn = asyncHandler(async (req, res, next) => {
    // extracting token from the cookies
    const { token } = req.cookies;

    // If no token send unauthorized message
    if (!token) {
        return next(new AppError("Unauthorized, please login to continue", 401));
    }

    // Decoding the token using jwt package verify method
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // If no decode send the message unauthorized
    if (!decoded) {
        return next(new AppError("Unauthorized, please login to continue", 401));
    }

    // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
    req.user = decoded;

    // Do not forget to call the next other wise the flow of execution will not be passed further
    next();
});

const authorizedRoles = (...roles) =>
    asyncHandler(async (req, _res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You do not have permission to view this route", 403));
        }

        next();
    });

const authorizedSubscriber = asyncHandler(async (req, res, next) => {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.role !== "ADMIN" && user.subscription.status !== "active") {
        return next(new AppError("please subscribe to access this route!", 400));
    }
    next();
});

export { isLoggedIn, authorizedRoles, authorizedSubscriber };
