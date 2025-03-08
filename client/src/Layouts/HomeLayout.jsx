import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking if user is logged in
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
        e.preventDefault();

        const res = await dispatch(logout());
        if (res?.payload?.success) navigate("/");
    }

    return (
        <div className="min-h-[90vh] relative">
            {/* Navigation Drawer */}
            <div className="drawer fixed left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label 
                        htmlFor="my-drawer" 
                        className="cursor-pointer fixed top-4 left-4 z-50 bg-amber-400/20 hover:bg-amber-400/40 p-2 rounded-full transition-all duration-300"
                    >
                        <FiMenu 
                            onClick={changeWidth} 
                            size={"28px"} 
                            className="text-amber-600 hover:text-amber-700" 
                        />
                    </label>
                </div>
                
                {/* Sidebar */}
                <div className="drawer-side w-0 z-50">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-6 w-64 sm:w-80 h-full bg-gradient-to-br from-gray-900 to-gray-800 text-base-content relative shadow-2xl overflow-y-auto">
                        {/* Close Button */}
                        <li className="w-fit absolute right-4 top-4 z-50">
                            <button 
                                onClick={hideDrawer}
                                className="hover:bg-white/10 rounded-full p-2 transition-colors duration-200"
                            >
                                <AiFillCloseCircle size={28} className="text-amber-400 hover:text-amber-300" />
                            </button>
                        </li>

                        {/* Logo or Title */}
                        <div className="text-center mb-8 mt-4">
                            <h2 className="text-2xl font-bold text-amber-400">
                                LMS <span className="text-white">Hub</span>
                            </h2>
                        </div>

                        {/* Navigation Items */}
                        <div className="space-y-2">
                            <li>
                                <NavLink 
                                    to="/" 
                                    className={({ isActive }) => 
                                        `group ${isActive ? 'bg-amber-400/20' : 'hover:bg-white/10'} 
                                        text-amber-400 hover:text-amber-500 rounded-lg px-4 py-3 flex items-center gap-3 transition-colors`
                                    }
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform">🏠</span> 
                                    <span>Home</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink 
                                    to="/courses"
                                    className={({ isActive }) => 
                                        `group ${isActive ? 'bg-amber-400/20' : 'hover:bg-white/10'} 
                                        text-amber-400 hover:text-amber-500 rounded-lg px-4 py-3 flex items-center gap-3 transition-colors`
                                    }
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform">📚</span> 
                                    <span>All Courses</span>
                                </NavLink>
                            </li>

                            {isLoggedIn && role === "ADMIN" && (
                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <p className="px-4 text-sm font-semibold text-gray-400 mb-2">Admin Panel</p>
                                    <li>
                                        <NavLink 
                                            to="/admin/dashboard"
                                            className={({ isActive }) => 
                                                `group ${isActive ? 'bg-amber-400/20' : 'hover:bg-white/10'} 
                                                text-amber-400 hover:text-amber-500 rounded-lg px-4 py-3 flex items-center gap-3 transition-colors`
                                            }
                                        >
                                            <span className="text-xl group-hover:scale-110 transition-transform">📊</span> 
                                            <span>Dashboard</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/course/create"
                                            className={({ isActive }) => 
                                                `group ${isActive ? 'bg-amber-400/20' : 'hover:bg-white/10'} 
                                                text-amber-400 hover:text-amber-500 rounded-lg px-4 py-3 flex items-center gap-3 transition-colors`
                                            }
                                        >
                                            <span className="text-xl group-hover:scale-110 transition-transform">🎓</span> 
                                            <span>Create Course</span>
                                        </NavLink>
                                    </li>
                                </div>
                            )}

                            <li>
                                <NavLink 
                                    to="/contact"
                                    className={({ isActive }) => 
                                        `group ${isActive ? 'bg-amber-400/20' : 'hover:bg-white/10'} 
                                        text-amber-400 hover:text-amber-500 rounded-lg px-4 py-3 flex items-center gap-3 transition-colors`
                                    }
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform">📧</span> 
                                    <span>Contact Us</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink 
                                    to="/about"
                                    className={({ isActive }) => 
                                        `group ${isActive ? 'bg-amber-400/20' : 'hover:bg-white/10'} 
                                        text-amber-400 hover:text-amber-500 rounded-lg px-4 py-3 flex items-center gap-3 transition-colors`
                                    }
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform">ℹ️</span> 
                                    <span>About Us</span>
                                </NavLink>
                            </li>
                        </div>

                        {/* Auth Buttons */}
                        <div className="absolute bottom-6 w-[calc(100%-3rem)] space-y-3">
                            {!isLoggedIn ? (
                                <>
                                    <NavLink
                                        to="/login"
                                        className="btn btn-block bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-full py-3 shadow-lg transition-all duration-300 hover:scale-105"
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="/signup"
                                        className="btn btn-block bg-gray-800 text-amber-400 border-2 border-amber-400 hover:bg-gray-700 rounded-full py-3 shadow-lg transition-all duration-300 hover:scale-105"
                                    >
                                        Sign Up
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        to="/user/profile"
                                        className="btn btn-block bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-full py-3 shadow-lg transition-all duration-300 hover:scale-105"
                                    >
                                        👤 View Profile
                                    </NavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-block bg-gray-800 text-amber-400 border-2 border-amber-400 hover:bg-gray-700 rounded-full py-3 shadow-lg transition-all duration-300 hover:scale-105"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </ul>
                </div>
            </div>

            {children}
            <Footer />
        </div>
    );
}

export default HomeLayout;