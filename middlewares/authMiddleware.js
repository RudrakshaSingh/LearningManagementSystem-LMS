import AppError from "../utilityFunctions/errorUtil.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
    //we are able to get info out of cookie because of cookie parser
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError("unauthenticated,please login again", 401));
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = userDetails;

    next();
};

export { isLoggedIn };
