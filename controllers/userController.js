import User from "../models/userModel.js";
import AppError from "../utilityFunctions/errorUtil.js";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, //so you cannot do anything with js from client
    secure: true,
};

const register = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName || email || !password) {
        //next goes down in app.js to app.use errormiddleware
        return next(new AppError("all fields are required", 400)); //it returns a extended eroor instance we need to send it to user
    }

    const userExists = User.findOne({ email });

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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError("all fieds are required", 400));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !user.comparePassword(password)) {
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

const logout = (req, res) => {
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
            user,
        });
    } catch (e) {
        return next(new AppError("Failed to fetch profile details", 500));
    }
};

export { register, login, logout, getProfile }; //as mutiple we dont use default
