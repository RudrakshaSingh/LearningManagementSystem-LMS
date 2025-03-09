import { Mail } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { forgotPassword } from "../../Redux/Slices/AuthSlice";

function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    function handleInputChange(e) {
        setEmail(e.target.value);
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!email) {
            return; // Toast error is handled in the thunk
        }

        const response = await dispatch(forgotPassword(email));
        if (response?.payload?.success) {
            setEmail(""); // Clear the input after success
            // Optionally navigate or show a success message; toast is already handled in thunk
            navigate("/login");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 p-4">
                <div className="w-full max-w-md">
                    <form
                        noValidate
                        onSubmit={onFormSubmit}
                        className="flex flex-col justify-center gap-6 rounded-2xl p-8 bg-white shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Forgot Password
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Enter your email to receive password reset instructions
                            </p>
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="email"
                                className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4 text-teal-600" />
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    name="email"
                                    id="email"
                                    placeholder="your@email.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                    onChange={handleInputChange}
                                    value={email}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                        >
                            Send Reset Link
                        </button>

                        <div className="text-center">
                            <p className="text-gray-500 text-sm">
                                Back to{" "}
                                <Link
                                    to="/login"
                                    className="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors duration-200"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default ForgotPassword;