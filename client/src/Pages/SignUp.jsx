import { Lock, Mail, User } from "lucide-react";
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
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 p-4">
                <div className="w-full max-w-md">
                    <form
                        noValidate
                        onSubmit={createNewAccount}
                        className="flex flex-col justify-center gap-6 rounded-2xl p-8 bg-white shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Join Us
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Create an account to start learning
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <label
                                htmlFor="image_uploads"
                                className="cursor-pointer flex items-center justify-center relative group"
                            >
                                {previewImage ? (
                                    <img
                                        className="w-24 h-24 rounded-full border-2 border-teal-500 object-cover shadow-md group-hover:shadow-lg transition-all duration-300"
                                        src={previewImage}
                                        alt="avatar preview"
                                    />
                                ) : (
                                    <BsPersonCircle className="w-24 h-24 text-teal-500 group-hover:text-teal-600 transition-colors duration-300" />
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white text-sm font-semibold">Upload</span>
                                </div>
                            </label>
                            <input
                                onChange={getImage}
                                className="hidden"
                                type="file"
                                name="image_uploads"
                                id="image_uploads"
                                accept=".jpg, .jpeg, .png, .svg"
                            />
                        </div>

                        <div className="space-y-5">
                            <div className="relative">
                                <label
                                    htmlFor="fullName"
                                    className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2"
                                >
                                    <User className="w-4 h-4 text-teal-600" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Enter your name..."
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                    onChange={handleUserInput}
                                    value={signupData.fullName}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="email"
                                    className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2"
                                >
                                    <Mail className="w-4 h-4 text-teal-600" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    name="email"
                                    id="email"
                                    placeholder="john@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                    onChange={handleUserInput}
                                    value={signupData.email}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2"
                                >
                                    <Lock className="w-4 h-4 text-teal-600" />
                                    Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                    onChange={handleUserInput}
                                    value={signupData.password}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                        >
                            Create Account
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors duration-200"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Signup;