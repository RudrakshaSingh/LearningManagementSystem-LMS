import { Lock,LogIn, User } from "lucide-react";
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
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
                <div className="w-full max-w-md">
                    <form
                        noValidate
                        onSubmit={onLogin}
                        className="flex flex-col justify-center gap-6 rounded-2xl p-8 bg-slate-800/70 backdrop-blur-lg border border-slate-700/50 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(0,0,0,0.3)]"
                    >
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-indigo-400 mb-2 tracking-tight">
                                Welcome Back
                            </h1>
                            <p className="text-slate-400 text-sm">
                                Sign in to continue your journey
                            </p>
                        </div>
                        
                        <div className="space-y-5">
                            <div className="relative">
                                <label htmlFor="email" className=" mb-2 text-sm font-medium text-slate-300 flex items-center gap-2">
                                    <User className="w-4 h-4 text-indigo-400" />
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        name="email"
                                        id="email"
                                        placeholder="john@example.com"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-slate-400 transition-all duration-300"
                                        onChange={handleUserInput}
                                        value={loginData.email}
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-slate-400" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative">
                                <label htmlFor="password" className=" mb-2 text-sm font-medium text-slate-300 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-indigo-400" />
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        required
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-12 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-slate-400 transition-all duration-300"
                                        onChange={handleUserInput}
                                        value={loginData.password}
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-400 transition-colors"
                                    >
                                        {isPasswordVisible ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 rounded-full py-3.5 font-semibold text-lg text-white group"
                        >
                            <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            Sign In
                        </button>

                        <div className="text-center">
                            <p className="text-slate-400 text-sm">
                                Don&apos;t have an account? {" "}
                                <Link 
                                    to="/signup" 
                                    className="text-indigo-500 hover:text-indigo-400 hover:underline font-medium transition-colors"
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