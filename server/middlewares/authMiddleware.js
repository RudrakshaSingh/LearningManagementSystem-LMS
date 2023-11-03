import User from "../models/userModel.js";
import AppError from "../utilityFunctions/errorUtil.js";
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandlerMiddleware.js";

const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError("Unauthenticated, please lougin again", 401));
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = userDetails;

    next();
};

const authorizedRoles =
    (...roles) =>
    async (req, res, next) => {
        const currentUserRole = req.user.role;
        if (!roles.includes(currentUserRole)) {
            return next(new AppError("You do not have permission to access this route", 403));
        }
        next();
    };
const authorizedSubscriber = asyncHandler(async (req, res, next) => {
    const user = User.findById(req.user.id);
    if (user.role !== "ADMIN" && user.subscription.status !== "active") {
        return next(new AppError("please subscribe to access this route!", 400));
    }
});

export { isLoggedIn, authorizedRoles, authorizedSubscriber };
