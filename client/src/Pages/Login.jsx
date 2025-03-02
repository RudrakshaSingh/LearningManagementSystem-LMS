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

        // dispatch create account action
        const response = await dispatch(login(loginData));
        if (response?.payload?.success) navigate("/");

        setLoginData({
            email: "",
            password: "",
        });
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <form
                    noValidate
                    onSubmit={onLogin}
                    className="flex flex-col justify-center gap-6 rounded-3xl p-8 w-full max-w-md bg-gray-800 border border-gray-700 shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                >
                    <h1 className="text-center text-3xl font-bold text-indigo-400">
                        Welcome Back!
                    </h1>
                    
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-medium text-gray-200">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                name="email"
                                id="email"
                                placeholder="john@example.com"
                                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400 transition-all"
                                onChange={handleUserInput}
                                value={loginData.email}
                            />
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="font-medium text-gray-200">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400 transition-all"
                                onChange={handleUserInput}
                                value={loginData.password}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 rounded-full py-3 font-semibold text-xl text-white"
                    >
                        Sign In
                    </button>

                    <p className="text-center text-gray-300 mt-6">
                        Don&apos;t have an account? {" "}
                        <Link 
                            to="/signup" 
                            className="text-indigo-500 hover:underline hover:text-indigo-400 font-medium  transition-colors"
                        >
                            Create account
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Login;