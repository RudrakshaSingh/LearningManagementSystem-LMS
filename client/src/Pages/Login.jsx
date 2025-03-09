import { Lock, LogIn, User } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    }

    async function onLogin(event) {
        event.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }

        const response = await dispatch(login(loginData));
        if (response?.payload?.success) navigate("/");

        setLoginData({
            email: "",
            password: "",
        });
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 p-4">
                <div className="w-full max-w-md">
                    <form
                        noValidate
                        onSubmit={onLogin}
                        className="flex flex-col justify-center gap-6 rounded-2xl p-8 bg-white shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Sign in to continue your learning journey
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="relative">
                                <label
                                    htmlFor="email"
                                    className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2"
                                >
                                    <User className="w-4 h-4 text-teal-600" />
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        name="email"
                                        id="email"
                                        placeholder="john@example.com"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                        onChange={handleUserInput}
                                        value={loginData.email}
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-gray-400" />
                                    </div>
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
                                <div className="relative">
                                    <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        required
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                        onChange={handleUserInput}
                                        value={loginData.password}
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-teal-600 transition-colors duration-200"
                                    >
                                        {isPasswordVisible ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 group"
                        >
                            <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            Sign In
                        </button>

                        <div className="text-center">
                            <p className="text-gray-500 text-sm">
                                Don&apos;t have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors duration-200"
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Login;