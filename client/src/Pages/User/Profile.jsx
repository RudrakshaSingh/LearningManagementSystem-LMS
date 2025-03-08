import { 
  CreditCard, 
  Edit, 
  KeyRound, 
  Mail, 
  User as UserIcon, 
  XCircle 
} from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.auth?.data);

    async function handleCancellation() {
        toast("Initiating cancellation");
        await dispatch(cancelCourseBundle());
        await dispatch(getUserData());
        toast.success("Cancellation completed!");
        navigate("/");
    }

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-gradient-to-br from-gray-800/80 to-gray-700/80 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 backdrop-blur-sm">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-amber-400/20 to-purple-400/20 p-6 text-center">
                        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text">
                            User Profile
                        </h1>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6 space-y-6">
                        {/* Avatar and Name */}
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                <img 
                                    src={userData?.avatar?.secure_url} 
                                    className="w-36 h-36 rounded-full object-cover border-4 border-amber-400/30 shadow-lg"
                                    alt="Profile" 
                                />
                                <div className="absolute bottom-0 right-0 bg-amber-400 text-gray-900 rounded-full p-2 shadow-lg">
                                    <Edit className="w-5 h-5" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-white capitalize mb-2">
                                {userData?.fullName}
                            </h3>
                        </div>

                        {/* User Details */}
                        <div className="space-y-4">
                            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                <div className="grid grid-cols-2 gap-4 text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-5 h-5 text-amber-400" />
                                        <span>Email:</span>
                                    </div>
                                    <p className="text-white">{userData?.email}</p>

                                    <div className="flex items-center gap-2">
                                        <UserIcon className="w-5 h-5 text-amber-400" />
                                        <span>Role:</span>
                                    </div>
                                    <p className="text-white">{userData?.role}</p>

                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-amber-400" />
                                        <span>Subscription:</span>
                                    </div>
                                    <p className={`${userData?.subscription?.status === "active" ? "text-green-400" : "text-red-400"}`}>
                                        {userData?.subscription?.status === "active" ? "Active" : "Inactive"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                to="/changepassword"
                                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-700 text-white py-3 rounded-lg hover:opacity-90 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                            >
                                <KeyRound className="mr-2 w-5 h-5 text-amber-400" />
                                Change Password
                            </Link>

                            <Link
                                to="/user/editprofile"
                                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-700 text-white py-3 rounded-lg hover:opacity-90 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                            >
                                <Edit className="mr-2 w-5 h-5 text-amber-400" />
                                Edit Profile
                            </Link>
                        </div>

                        {/* Cancel Subscription */}
                        {userData?.subscription?.status === "active" && (
                            <button
                                onClick={handleCancellation}
                                className="w-full flex items-center justify-center bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-lg hover:opacity-90 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                            >
                                <XCircle className="mr-2 w-5 h-5" />
                                Cancel Subscription
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Profile;