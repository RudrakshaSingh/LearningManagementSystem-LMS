import User from "../models/userModel";
import AppError from "../utilityFunctions/errorUtil";

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

const login = (req, res) => {};

const logout = (req, res) => {};

const getProfile = (req, res) => {};

export { register, login, logout, getProfile }; //as mutiple we dont use default
