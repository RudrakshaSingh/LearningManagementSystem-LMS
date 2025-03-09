import { Lock, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { changePassword } from "../../Redux/Slices/AuthSlice";

function ChangePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [visibility, setVisibility] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    }

    function toggleVisibility(field) {
        setVisibility({
            ...visibility,
            [field]: !visibility[field],
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New password and confirmation do not match");
            return;
        }

        const response = await dispatch(changePassword({
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword,
        }));
        if (response?.payload?.success) {
            setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
            toast.success("Password changed successfully!");
            navigate("/user/profile"); // Redirect back to profile after success
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
                                Change Password
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Update your password securely
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="relative">
                                <label
                                    htmlFor="oldPassword"
                                    className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2"
                                >
                                    <Lock className="w-4 h-4 text-teal-600" />
                                    Old Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={visibility.oldPassword ? "text" : "password"}
                                        required
                                        name="oldPassword"
                                        id="oldPassword"
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                        onChange={handleInputChange}
                                        value={passwordData.oldPassword}
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibility("oldPassword")}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-teal-600 transition-colors duration-200"
                                    >
                                        {visibility.oldPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="newPassword"
                                    className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2"
                                >
                                    <Lock className="w-4 h-4 text-teal-600" />
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={visibility.newPassword ? "text" : "password"}
                                        required
                                        name="newPassword"
                                        id="newPassword"
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                        onChange={handleInputChange}
                                        value={passwordData.newPassword}
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibility("newPassword")}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-teal-600 transition-colors duration-200"
                                    >
                                        {visibility.newPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2"
                                >
                                    <Lock className="w-4 h-4 text-teal-600" />
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={visibility.confirmPassword ? "text" : "password"}
                                        required
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                        onChange={handleInputChange}
                                        value={passwordData.confirmPassword}
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibility("confirmPassword")}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-teal-600 transition-colors duration-200"
                                    >
                                        {visibility.confirmPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                        >
                            <Save className="w-5 h-5" />
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default ChangePassword;