import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isValidPassword } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value,
        });
    }

    function getImage(event) {
        event.preventDefault();
        const uploadedImage = event.target.files[0];

        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage,
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setPreviewImage(this.result);
            });
        }
    }

    async function createNewAccount(event) {
        event.preventDefault();
        if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
            toast.error("Please fill all the details");
            return;
        }

        if (signupData.fullName.length < 5) {
            toast.error("Name should be at least of 5 characters");
            return;
        }
        if (!isEmail(signupData.email)) {
            toast.error("Invalid email id");
            return;
        }
        if (!isValidPassword(signupData.password)) {
            toast.error("Password should be 6 - 16 character long with at least a number and special character");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        const response = await dispatch(createAccount(formData));
        if (response?.payload?.success) navigate("/");

        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: "",
        });
        setPreviewImage("");
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <form
                    noValidate
                    onSubmit={createNewAccount}
                    className="bg-gray-800 flex flex-col justify-center gap-6 rounded-2xl p-10 text-gray-200 w-full max-w-md shadow-2xl"
                >
                    <h1 className="text-center text-3xl font-bold text-indigo-400">Create Account</h1>

                    <label htmlFor="image_uploads" className="cursor-pointer flex items-center justify-center">
                        {previewImage ? (
                            <img
                                className="w-24 h-24 rounded-full border-2 border-indigo-400"
                                src={previewImage}
                                alt="avatar preview"
                            />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 text-indigo-400" />
                        )}
                    </label>
                    <input
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />
                    <div className="flex flex-col">
                        <label htmlFor="fullName" className="font-semibold text-lg">
                            Name
                        </label>
                        <input
                            type="text"
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name..."
                            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-semibold text-lg">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email..."
                            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            onChange={handleUserInput}
                            value={signupData.email}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-semibold text-lg">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password..."
                            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            onChange={handleUserInput}
                            value={signupData.password}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 rounded-full py-3 font-semibold text-xl text-white"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-400 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Signup;
