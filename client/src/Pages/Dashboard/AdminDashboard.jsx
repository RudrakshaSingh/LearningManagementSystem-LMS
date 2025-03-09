/* eslint-disable react-hooks/exhaustive-deps */
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import {  FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);
    const { allPayments, monthlySalesRecord } = useSelector((state) => state.razorpay);
    const myCourses = useSelector((state) => state?.course?.courseData);

    // Enhanced color scheme
    const colors = {
        primary: "#3B82F6", // Blue-500
        primaryLight: "#DBEAFE", // Blue-100
        primaryDark: "#1E40AF", // Blue-800
        secondary: "#6366F1", // Indigo-500
        accent: "#8B5CF6", // Violet-500
        accentLight: "#EDE9FE", // Violet-100
        success: "#10B981", // Emerald-500
        successLight: "#D1FAE5", // Emerald-100
        danger: "#EF4444", // Red-500
        dangerLight: "#FEE2E2", // Red-100
        gray: "#6B7280", // Gray-500
        grayLight: "#F3F4F6", // Gray-100
        grayDark: "#1F2937", // Gray-800
        background: "#F9FAFB", // Gray-50
        white: "#FFFFFF",
    };

    // Chart data with improved colors
    const userData = {
        labels: ["Registered Users", "Enrolled Users"],
        datasets: [
            {
                label: "User Details",
                data: [allUsersCount, subscribedCount],
                backgroundColor: [colors.primary, colors.accent],
                borderColor: [colors.primaryDark, colors.accent],
                borderWidth: 1,
                hoverOffset: 10,
            },
        ],
    };

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Sales / Month",
                data: monthlySalesRecord,
                backgroundColor: `${colors.primary}CC`, // With opacity
                borderColor: colors.primary,
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };

    // Improved chart options
    const pieOptions = {
        plugins: {
            legend: { 
                position: 'right',
                labels: { 
                    color: colors.grayDark, 
                    font: { size: 14, weight: "500" },
                    padding: 20,
                } 
            },
            title: {
                display: true,
                text: "User Distribution",
                color: colors.grayDark,
                font: { size: 18, weight: "600" },
                padding: { bottom: 20 }
            },
        },
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { 
                labels: { 
                    color: colors.grayDark, 
                    font: { size: 14, weight: "500" } 
                } 
            },
            title: {
                display: true,
                text: "Monthly Sales Performance",
                color: colors.grayDark,
                font: { size: 18, weight: "600" },
                padding: { bottom: 20 }
            },
        },
        scales: {
            y: { 
                ticks: { color: colors.gray },
                grid: { color: `${colors.gray}33` } // Very light opacity for grid
            },
            x: { 
                ticks: { color: colors.gray },
                grid: { color: `${colors.gray}33` }
            },
        },
    };

    async function onCourseDelete(id) {
        if (window.confirm("Are you sure you want to delete this course?")) {
            setIsLoading(true);
            const res = await dispatch(deleteCourse(id));
            if (res?.payload?.success) {
                await dispatch(getAllCourses());
            }
            setIsLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await Promise.all([dispatch(getAllCourses()), dispatch(getStatsData()), dispatch(getPaymentRecord())]);
            setIsLoading(false);
        })();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
    };

    // Pagination logic for courses
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourses = myCourses?.slice(indexOfFirstItem, indexOfLastItem) || [];
    const totalPages = Math.ceil((myCourses?.length || 0) / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Calculate average lectures per course with 2 decimal places
    const totalLectures = myCourses?.reduce((sum, course) => sum + (course.numbersOfLectures || 0), 0) || 0;
    const avgLecturesPerCourse = myCourses?.length ? (totalLectures / myCourses.length).toFixed(2) : "0.00";

    // Calculate user conversion rate
    const conversionRate = allUsersCount ? Math.round((subscribedCount / allUsersCount) * 100) : 0;

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Monitor your platform performance, user metrics, and manage courses
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            {/* Quick Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex items-center">
                                    <div className="rounded-full bg-blue-100 p-4 mr-4">
                                        <FaUsers className="text-blue-600 text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Total Users</p>
                                        <h3 className="text-2xl font-bold text-gray-900">{allUsersCount || 0}</h3>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex items-center">
                                    <div className="rounded-full bg-violet-100 p-4 mr-4">
                                        <FaUsers className="text-violet-600 text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Subscribed Users</p>
                                        <h3 className="text-2xl font-bold text-gray-900">{subscribedCount || 0}</h3>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex items-center">
                                    <div className="rounded-full bg-emerald-100 p-4 mr-4">
                                        <GiMoneyStack className="text-emerald-600 text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {formatCurrency((allPayments?.count || 0) * 3)}
                                        </h3>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex items-center">
                                    <div className="rounded-full bg-indigo-100 p-4 mr-4">
                                        <BsCollectionPlayFill className="text-indigo-600 text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Total Courses</p>
                                        <h3 className="text-2xl font-bold text-gray-900">{myCourses?.length || 0}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Stats and Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                                {/* User Statistics */}
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <div className="w-full h-80">
                                        <Pie data={userData} options={pieOptions} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium text-blue-600">Conversion Rate</span>
                                                <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">Users</span>
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900">{conversionRate}%</p>
                                        </div>
                                        <div className="p-4 bg-violet-50 rounded-lg border border-violet-100">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium text-violet-600">Avg. Revenue</span>
                                                <span className="text-xs bg-violet-100 text-violet-800 py-1 px-2 rounded-full">Per User</span>
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(3)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sales Statistics */}
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <div className="w-full h-80">
                                        <Bar data={salesData} options={barOptions} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium text-indigo-600">Subscriptions</span>
                                                <span className="text-xs bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full">Total</span>
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900">{allPayments?.count || 0}</p>
                                        </div>
                                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium text-emerald-600">Avg. Lectures</span>
                                                <span className="text-xs bg-emerald-100 text-emerald-800 py-1 px-2 rounded-full">Per Course</span>
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900">{avgLecturesPerCourse}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Courses Management */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">Course Management</h2>
                                    <button
                                        onClick={() => navigate("/course/create")}
                                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                                    >
                                        <Plus className="w-4 h-4 mr-2" /> Create New Course
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-200">
                                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Title</th>
                                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Instructor</th>
                                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Lectures</th>
                                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {currentCourses.length ? (
                                                currentCourses.map((course, idx) => (
                                                    <tr
                                                        key={course._id}
                                                        className="hover:bg-gray-50 transition-colors duration-150"
                                                    >
                                                        <td className="py-3 px-4 text-sm text-gray-500">{indexOfFirstItem + idx + 1}</td>
                                                        <td className="py-3 px-4 max-w-xs truncate text-sm font-medium text-gray-900">{course?.title || "N/A"}</td>
                                                        <td className="py-3 px-4 text-sm text-gray-500">
                                                            <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700">
                                                                {course?.category || "N/A"}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-sm text-gray-500">{course?.createdBy || "Unknown"}</td>
                                                        <td className="py-3 px-4 text-sm text-gray-500">
                                                            {course?.numbersOfLectures !== undefined ? course.numbersOfLectures : "0"}
                                                        </td>
                                                        <td className="py-3 px-4 max-w-xs truncate text-sm text-gray-500" title={course?.description}>
                                                            {course?.description || "No description"}
                                                        </td>
                                                        <td className="py-3 px-4 flex justify-center gap-2">
                                                            <button
                                                                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-2 rounded-md transition-all duration-200"
                                                                onClick={() => navigate("/course/displaylectures", { state: { ...course } })}
                                                                title="View Lectures"
                                                            >
                                                                <BsCollectionPlayFill />
                                                            </button>
                                                            <button
                                                                className="bg-red-50 hover:bg-red-100 text-red-700 p-2 rounded-md transition-all duration-200"
                                                                onClick={() => onCourseDelete(course?._id)}
                                                                title="Delete Course"
                                                            >
                                                                <BsTrash />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="py-8 text-center text-gray-500">
                                                        <div className="flex flex-col items-center">
                                                            <BsCollectionPlayFill className="text-gray-300 text-4xl mb-2" />
                                                            <p className="text-gray-400">No courses available. Create your first course!</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {myCourses?.length > itemsPerPage && (
                                    <div className="flex justify-center items-center space-x-4 mt-6">
                                        <button
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                            className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                                        </button>
                                        <div className="flex items-center space-x-1">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`w-8 h-8 rounded-md text-sm flex items-center justify-center ${
                                                        currentPage === page 
                                                            ? 'bg-blue-500 text-white' 
                                                            : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                            className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Next <ChevronRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default AdminDashboard;