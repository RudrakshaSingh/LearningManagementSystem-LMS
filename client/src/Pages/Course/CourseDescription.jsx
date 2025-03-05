import { Book, User, Video } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescription() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const { role, data } = useSelector((state) => state.auth);

    // Fallback for missing data
    const courseData = state || {
        thumbnail: { secure_url: "/api/placeholder/600/400" },
        title: "Course Title",
        description: "No description available.",
        numbersOfLectures: 0,
        createdBy: "Unknown Instructor"
    };

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-gradient-to-br from-teal-50 to-teal-100 py-16 px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-2xl rounded-2xl overflow-hidden border-2 border-teal-100">
                        {/* Course Image and Details Column */}
                        <div className="p-8 flex flex-col items-center justify-between">
                            <div className="w-full max-w-md mb-8 group">
                                <img
                                    className="w-full h-64 object-cover rounded-2xl shadow-lg 
                                               transform transition-transform duration-300 
                                               group-hover:scale-105 group-hover:shadow-xl"
                                    alt="course thumbnail"
                                    src={courseData.thumbnail?.secure_url}
                                />
                            </div>

                            <div className="w-full space-y-6">
                                <div className="grid grid-cols-2 gap-4 text-gray-700">
                                    <div className="bg-teal-50 p-4 rounded-lg flex items-center space-x-3 shadow-md">
                                        <Book className="text-teal-600" />
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Total Lectures</p>
                                            <p className="text-lg font-bold text-teal-800">
                                                {courseData.numbersOfLectures}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-teal-50 p-4 rounded-lg flex items-center space-x-3 shadow-md">
                                        <User className="text-teal-600" />
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Instructor</p>
                                            <p className="text-lg font-bold text-teal-800">
                                                {courseData.createdBy}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {role === "ADMIN" || data?.subscription?.status === "active" ? (
                                    <button
                                        onClick={() => navigate("/course/displaylectures", { state: { ...courseData } })}
                                        className="w-full py-3 bg-teal-600 text-white rounded-full 
                                                   hover:bg-teal-700 transition-colors duration-300 
                                                   font-semibold text-lg flex items-center justify-center 
                                                   space-x-2 shadow-md hover:shadow-lg"
                                    >
                                        <Video className="w-5 h-5" />
                                        <span>Watch Lectures</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => navigate("/checkout")}
                                        className="w-full py-3 bg-teal-600 text-white rounded-full 
                                                   hover:bg-teal-700 transition-colors duration-300 
                                                   font-semibold text-lg flex items-center justify-center 
                                                   space-x-2 shadow-md hover:shadow-lg"
                                    >
                                        <Video className="w-5 h-5" />
                                        <span>Subscribe to Access</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Course Description Column */}
                        <div className="p-8 bg-teal-50/50 flex flex-col justify-center">
                            <h1 className="text-4xl font-extrabold text-teal-900 mb-6 text-center 
                                           leading-tight tracking-tight">
                                {courseData.title}
                            </h1>
                            
                            <div className="space-y-4 bg-white p-6 rounded-xl shadow-md">
                                <h2 className="text-xl font-semibold text-teal-800 border-b-2 
                                               border-teal-200 pb-2 flex items-center">
                                    <Book className="mr-2 text-teal-600" />
                                    Course Description
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-base">
                                    {courseData.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription;