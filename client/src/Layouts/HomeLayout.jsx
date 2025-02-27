import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking if user is logged in
    //if state not null get auth,if auth not null get islogged in otherwise null
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    // for displaying the options acc to role
    const role = useSelector((state) => state?.auth?.role);

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "auto";
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "0";
    }

    async function handleLogout(e) {
        //event object e
        e.preventDefault();

        const res = await dispatch(logout());
        if (res?.payload?.success) navigate("/");
    }

    return (
        <div className="min-h-[90vh] relative">
            {/* Navigation Drawer */}
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu 
                            onClick={changeWidth} 
                            size={"32px"} 
                            className="font-bold text-white m-4 " 
                        />
                    </label>
                </div>
                
                {/* Sidebar */}
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-gradient-to-br from-purple-50 to-blue-50 text-base-content relative shadow-xl">
                        {/* Close Button */}
                        <li className="w-fit absolute right-2 top-2 z-50">
                            <button 
                                onClick={hideDrawer}
                                className="hover:bg-purple-100 rounded-full p-1 transition-colors duration-200"
                            >
                                <AiFillCloseCircle size={24} className="text-purple-600" />
                            </button>
                        </li>

                        {/* Navigation Items */}
                        <div className="space-y-2 mt-8">
                            <li>
                                <Link 
                                    to="/" 
                                    className="text-purple-900 hover:bg-purple-100 rounded-lg px-4 py-3 flex items-center gap-2"
                                >
                                    <span className="text-xl">🏠</span> Home
                                </Link>
                            </li>

                            {isLoggedIn && role === "ADMIN" && (
                                <div className="mt-4 pt-4 border-t border-purple-100">
                                    <p className="px-4 text-sm font-semibold text-purple-500 mb-2">Admin Panel</p>
                                    <li>
                                        <Link 
                                            to="/admin/dashboard"
                                            className="text-purple-900 hover:bg-purple-100 rounded-lg px-4 py-3 flex items-center gap-2"
                                        >
                                            <span className="text-xl">📊</span> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/course/create"
                                            className="text-purple-900 hover:bg-purple-100 rounded-lg px-4 py-3 flex items-center gap-2"
                                        >
                                            <span className="text-xl">🎓</span> Create Course
                                        </Link>
                                    </li>
                                </div>
                            )}

                            <li>
                                <Link 
                                    to="/courses"
                                    className="text-purple-900 hover:bg-purple-100 rounded-lg px-4 py-3 flex items-center gap-2"
                                >
                                    <span className="text-xl">📚</span> All Courses
                                </Link>
                            </li>

                            <li>
                                <Link 
                                    to="/contact"
                                    className="text-purple-900 hover:bg-purple-100 rounded-lg px-4 py-3 flex items-center gap-2"
                                >
                                    <span className="text-xl">📧</span> Contact Us
                                </Link>
                            </li>

                            <li>
                                <Link 
                                    to="/about"
                                    className="text-purple-900 hover:bg-purple-100 rounded-lg px-4 py-3 flex items-center gap-2"
                                >
                                    <span className="text-xl">ℹ️</span> About Us
                                </Link>
                            </li>
                        </div>

                        {/* Auth Buttons */}
                        {!isLoggedIn ? (
                            <div className="absolute bottom-6 w-[85%] space-y-3">
                                <Link
                                    to="/login"
                                    className="btn btn-block bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3 shadow-lg transition-transform duration-200 hover:scale-105"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="btn btn-block bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 rounded-full py-3 shadow-lg transition-transform duration-200 hover:scale-105"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div className="absolute bottom-6 w-[85%] space-y-3">
                                <Link
                                    to="/user/profile"
                                    className="btn btn-block bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3 shadow-lg transition-transform duration-200 hover:scale-105"
                                >
                                    👤 View Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-block bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 rounded-full py-3 shadow-lg transition-transform duration-200 hover:scale-105"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </ul>
                </div>
            </div>

            {children}
            <Footer />
        </div>
    );
}

export default HomeLayout;