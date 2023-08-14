import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        //schema level validations
        fullName: {
            type: "string",
            required: [true, "name is required"],
            minLength: [5, "name must be at least 5 characters"],
            maxLength: [50, "name must be less than 50 characters"],
            lowercase: true,
            trim: true,
        },
        email: {
            type: "string",
            required: [true, "email is required"],
            lowercase: true,
            trim: true,
            unique: true,
            //database level regex for email validation
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please fill in a valid email address",
            ],
        },
        password: {
            type: "string",
            required: [true, "passord is required"],
            minLength: [8, "password must be at least 8 characters"],
            select: false,
        },
        avatar: {
            //for image related
            public_id: {
                type: "string",
            },
            secure_url: {
                type: "string",
            },
        },
        role: {
            //for admin authorization
            type: "string",
            enum: ["USER", "ADMIN"], //for possible type of user//enum stands for "enumeration." It's used to define a list of allowable values for a particular field.
            default: "USER",
        },
        forgotPasswordToken: String, //define directly if one
        forgotPasswordExpiry: Date,
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    //generic method
    generateJWTToken: async function () {
        //like a promise
        return await jwt.sign(
            {
                id: this._id,
                email: this.email,
                subscription: this.subscription,
                role: this.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        );
    },
};

const User = model("user", userSchema);

export default User;
