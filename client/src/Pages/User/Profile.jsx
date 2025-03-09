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
              <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4">
                  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                      {/* Profile Header */}
                      <div className="bg-teal-600 p-6 text-center">
                          <h1 className="text-2xl font-bold text-white">
                              Your Profile
                          </h1>
                      </div>
  
                      {/* Profile Content */}
                      <div className="p-6 space-y-6">
                          {/* Avatar and Name */}
                          <div className="flex flex-col items-center">
                              <div className="relative mb-4 group">
                                  <img 
                                      src={userData?.avatar?.secure_url} 
                                      className="w-32 h-32 rounded-full object-cover border-4 border-teal-200 shadow-md group-hover:opacity-80 transition-opacity duration-300"
                                      alt="Profile" 
                                  />
                                  <Link
                                      to="/user/editprofile"
                                      className="absolute bottom-0 right-0 bg-teal-600 text-white rounded-full p-2 shadow-md group-hover:bg-teal-700 transition-colors duration-300"
                                  >
                                      <Edit className="w-5 h-5" />
                                  </Link>
                              </div>
                              <h3 className="text-2xl font-semibold text-gray-900 capitalize">
                                  {userData?.fullName}
                              </h3>
                          </div>
  
                          {/* User Details */}
                          <div className="space-y-4">
                              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                  <div className="grid grid-cols-2 gap-4 text-gray-600">
                                      <div className="flex items-center gap-2">
                                          <Mail className="w-5 h-5 text-teal-600" />
                                          <span>Email:</span>
                                      </div>
                                      <p className="text-gray-900 truncate">{userData?.email}</p>
  
                                      <div className="flex items-center gap-2">
                                          <UserIcon className="w-5 h-5 text-teal-600" />
                                          <span>Role:</span>
                                      </div>
                                      <p className="text-gray-900">{userData?.role}</p>
  
                                      <div className="flex items-center gap-2">
                                          <CreditCard className="w-5 h-5 text-teal-600" />
                                          <span>Subscription:</span>
                                      </div>
                                      <p className={`${userData?.subscription?.status === "active" ? "text-teal-600" : "text-red-600"} font-semibold`}>
                                          {userData?.subscription?.status === "active" ? "Active" : "Inactive"}
                                      </p>
                                  </div>
                              </div>
                          </div>
  
                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-4">
                              <Link
                                  to="/changepassword"
                                  className="group flex items-center justify-center bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                              >
                                  <KeyRound className="mr-2 w-5 h-5" />
                                  Change Password
                              </Link>
  
                              <Link
                                  to="/user/editprofile"
                                  className="group flex items-center justify-center bg-white text-teal-600 border-2 border-teal-600 py-3 rounded-lg hover:bg-teal-50 transition-all duration-300 hover:-translate-y-1 shadow-md"
                              >
                                  <Edit className="mr-2 w-5 h-5" />
                                  Edit Profile
                              </Link>
                          </div>
  
                          {/* Cancel Subscription */}
                          {userData?.subscription?.status === "active" && (
                              <button
                                  onClick={handleCancellation}
                                  className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
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