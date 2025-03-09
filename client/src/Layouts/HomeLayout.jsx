import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
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
        <div className="min-h-screen bg-gray-50 relative">
            {/* Navigation Drawer */}
            <div className="drawer fixed left-0 top-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label
                        htmlFor="my-drawer"
                        className="cursor-pointer fixed top-6 left-6 z-50 bg-white p-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <FiMenu
                            onClick={changeWidth}
                            size={28}
                            className="text-teal-600 hover:text-teal-700"
                        />
                    </label>
                </div>

                {/* Sidebar */}
                <div className="drawer-side w-0 z-50">
                    <label htmlFor="my-drawer" className="drawer-overlay bg-gray-900/60"></label>
                    <ul className="menu p-6 w-72 sm:w-80 h-full bg-white text-gray-700 relative shadow-2xl overflow-y-auto border-r border-gray-100">
                        {/* Close Button */}
                        <li className="w-fit absolute right-4 top-4 z-50">
                            <button
                                onClick={hideDrawer}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            >
                                <AiFillCloseCircle size={28} className="text-teal-500 hover:text-teal-600" />
                            </button>
                        </li>

                        {/* Logo */}
                        <div className="text-center mb-10 mt-6">
                            <h2 className="text-3xl font-extrabold text-teal-600 tracking-tight">
                                LMS <span className="text-gray-800">Hub</span>
                            </h2>
                            <p className="text-sm text-gray-400">Learn. Grow. Succeed.</p>
                        </div>

                        {/* Navigation Items */}
                        <div className="space-y-1">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `group ${isActive ? 'bg-teal-50 text-teal-600' : 'hover:bg-gray-50'} 
                                        rounded-lg px-4 py-3 flex items-center gap-3 transition-all duration-200 font-medium`
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
                                        `group ${isActive ? 'bg-teal-50 text-teal-600' : 'hover:bg-gray-50'} 
                                        rounded-lg px-4 py-3 flex items-center gap-3 transition-all duration-200 font-medium`
                                    }
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform">📚</span>
                                    <span>All Courses</span>
                                </NavLink>
                            </li>

                            {isLoggedIn && role === "ADMIN" && (
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                        Admin Panel
                                    </p>
                                    <li>
                                        <NavLink
                                            to="/admin/dashboard"
                                            className={({ isActive }) =>
                                                `group ${isActive ? 'bg-teal-50 text-teal-600' : 'hover:bg-gray-50'} 
                                                rounded-lg px-4 py-3 flex items-center gap-3 transition-all duration-200 font-medium`
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
                                                `group ${isActive ? 'bg-teal-50 text-teal-600' : 'hover:bg-gray-50'} 
                                                rounded-lg px-4 py-3 flex items-center gap-3 transition-all duration-200 font-medium`
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
                                        `group ${isActive ? 'bg-teal-50 text-teal-600' : 'hover:bg-gray-50'} 
                                        rounded-lg px-4 py-3 flex items-center gap-3 transition-all duration-200 font-medium`
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
                                        `group ${isActive ? 'bg-teal-50 text-teal-600' : 'hover:bg-gray-50'} 
                                        rounded-lg px-4 py-3 flex items-center gap-3 transition-all duration-200 font-medium`
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
                                        className="block w-full bg-teal-600 text-white py-3 rounded-lg text-center font-medium 
                                        hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="/signup"
                                        className="block w-full bg-white text-teal-600 py-3 rounded-lg text-center font-medium 
                                        border-2 border-teal-600 hover:bg-teal-50 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        Sign Up
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        to="/user/profile"
                                        className="block w-full bg-teal-600 text-white py-3 rounded-lg text-center font-medium 
                                        hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        👤 View Profile
                                    </NavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full bg-white text-teal-600 py-3 rounded-lg text-center font-medium 
                                        border-2 border-teal-600 hover:bg-teal-50 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <main className="relative z-10">
                {children}
            </main>
            
            <Footer />
        </div>
    );
}

export default HomeLayout;