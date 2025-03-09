import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { resetPassword } from "../../Redux/Slices/AuthSlice";

function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { resetToken } = useParams(); // Extract resetToken from URL

    const [passwordData, setPasswordData] = useState({
        password: "",
        confirmPassword: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!passwordData.password || !passwordData.confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }
        if (passwordData.password !== passwordData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const response = await dispatch(resetPassword({ resetToken, password: passwordData.password }));
        if (response?.payload?.success) {
            setPasswordData({ password: "", confirmPassword: "" });
            toast.success("Password reset successfully! Please log in.");
            navigate("/login"); // Redirect to login after success
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
                                Reset Password
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Enter your new password below
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2"
                                >
                                    <Lock className="w-4 h-4 text-teal-600" />
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                    onChange={handleInputChange}
                                    value={passwordData.password}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2"
                                >
                                    <Lock className="w-4 h-4 text-teal-600" />
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                    onChange={handleInputChange}
                                    value={passwordData.confirmPassword}
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
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default ResetPassword;