import User from "../models/userModel.js";
import AppError from "../utilityFunctions/errorUtil.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../utilityFunctions/sendEmail.js";
import crypto from "crypto";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, //so you cannot do anything with js from client
    // secure: true,
};

const register = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        //next goes down in app.js to app.use errormiddleware
        return next(new AppError("all fields are required", 400)); //it returns a extended eroor instance we need to send it to user
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return next(new AppError("email already exist", 400));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url:
                "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
        },
    });

    if (!user) {
        return next(
            new AppError("User registration failed, please try again", 400)
        );
    }

    //todo :file upload
    console.log("file details", JSON.stringify(req.file));
    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "lms",
                width: 250,
                height: 250,
                gravity: "faces", //auto processing for face focusing
                crop: "fill",
            }); //first path second configuration

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // Remove file from server(as it was temperary)
                await fs.rm(`uploads/${req.file.filename}`);
            }
        } catch (e) {
            return next(
                new AppError(e || "File not uploaded, please try again", 500)
            );
        }
    }

    await user.save();

    user.password = undefined;

    const token = await user.generateJWTToken();

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
        success: true,
        message: "user registered successfully",
        user,
    });
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError("all fieds are required", 400));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError("Email or password does not match", 400));
        }

        const token = await user.generateJWTToken();
        user.password = undefined;

        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            success: true,
            message: "User loggedin successfully",
            user,
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};

const logout = (req, res, next) => {
    res.cookie("token", null, {
        secure: true,
        maxAge: 0, //optinal as token is alrady deleted with null
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json({
            success: true,
            message: "User details",
            data: user,
        });
    } catch (e) {
        return next(new AppError("Failed to fetch profile details", 500));
    }
};

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new AppError("email is required", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError("email not registered", 400));
    }

    const resetToken = await user.generatePasswordResetToken();

    await user.save();

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    console.log(resetPasswordUrl);

    const subject = "Reset Password";
    const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

    try {
        await sendEmail(email, subject, message);

        res.status(200).json({
            success: true,
            message: `reset tokrn has seen to ${email} successfully`,
        });
    } catch (e) {
        //if by mistake email didnt sent
        //for security purpose
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;
        return next(new AppError(e.message, 500));
    }
};

const resetPassword = async (req, res) => {
    const { resetToken } = req.params;

    const { password } = req.body;

    const forgotPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }, //jiski expiry expire nahi hui
    });

    if (!user) {
        return next(
            new AppError("token is invalid or expired,please try again", 400)
        );
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    user.save();

    res.status(200).json({
        success: true,
        message: "Password changed successfully!",
    });
};

const changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    if (!oldPassword || !newPassword) {
        return next(new AppError("all fields are mandatory", 400));
    }

    const user = await User.findById(id).select("+password");

    if (!user) {
        return next(new AppError("user does not exist", 400));
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if (!isPasswordValid) {
        return next(new AppError("invalid old password", 400));
    }

    user.password = newPassword;

    await user.save();

    user.password = undefined;
    res.status(200).json({
        success: true,
        message: "password changed successfully",
    });
};
const updateUser = async (req, res, next) => {
    const { fullName } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
        return next(new AppError("user does not exist", 400));
    }

    if (req.body.fullName) {
        user.fullName = fullName;
    }

    if (req.file) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "lms",
                width: 250,
                height: 250,
                gravity: "faces",
                crop: "fill",
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // Remove file from server
                fs.rm(`uploads/${req.file.filename}`);
            }
        } catch (e) {
            return next(
                new AppError(e || "File not uploaded, please try again", 500)
            );
        }
    }
    await user.save();
    res.status(200).json({
        success: true,
        message: "user details updated successfully",
    });
};

export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser,
}; //as mutiple we dont use default
