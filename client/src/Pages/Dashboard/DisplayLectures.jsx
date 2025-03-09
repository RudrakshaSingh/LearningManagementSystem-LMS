/* eslint-disable react-hooks/exhaustive-deps */
import { Clock, FileText, Play, Plus, Trash2, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation(); //getting all lectures details
    const { lectures } = useSelector((state) => state.lecture); //accesing what we fetched with useeffect
    const { role } = useSelector((state) => state.auth);

    const [currentVideo, setCurrentVideo] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    async function onLectureDelete(courseId, lectureId) {
        if (window.confirm("Are you sure you want to delete this lecture?")) {
            setIsDeleting(true);
            await dispatch(deleteCourseLecture({ courseId: courseId, lectureId: lectureId }));
            await dispatch(getCourseLectures(courseId));
            setIsDeleting(false);
        }
    }

    useEffect(() => {
        if (!state) navigate("/courses");
        dispatch(getCourseLectures(state._id));
    }, []);

    // Calculate lecture duration in minutes (mock function - you'll need to implement actual duration logic)
    const getLectureDuration = () => {
        return "10:15"; // Example duration
    };

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-gray-50 py-10 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Course Header */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{state?.title}</h1>
                                <p className="text-gray-500 mt-1">
                                    {lectures?.length || 0} {lectures?.length === 1 ? 'lecture' : 'lectures'} available
                                </p>
                            </div>
                            {role === "ADMIN" && (
                                <button
                                    onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Add New Lecture
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Lecture Content */}
                    {lectures && lectures.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Video Player Section */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                    <div className="aspect-video bg-gray-900">
                                        <video
                                            src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                                            className="w-full h-full object-contain"
                                            controls
                                            disablePictureInPicture
                                            controlsList="nodownload"
                                        ></video>
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                            {lectures && lectures[currentVideo]?.title}
                                        </h2>
                                        <div className="flex items-center text-gray-500 text-sm mb-4">
                                            <Clock className="w-4 h-4 mr-1" />
                                            <span className="mr-4">{getLectureDuration()}</span>
                                            <Video className="w-4 h-4 mr-1" />
                                            <span>Lecture {currentVideo + 1} of {lectures.length}</span>
                                        </div>
                                        <div className="border-t border-gray-100 pt-4">
                                            <h3 className="text-sm font-medium text-gray-700 mb-2">Description:</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {lectures && lectures[currentVideo]?.description || "No description available for this lecture."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lecture List Section */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 border-b border-gray-100 bg-gray-50">
                                    <h3 className="font-semibold text-gray-800">Course Content</h3>
                                </div>
                                
                                <div className="overflow-y-auto max-h-[600px]">
                                    {lectures.map((lecture, idx) => (
                                        <div 
                                            key={lecture._id}
                                            className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${
                                                currentVideo === idx ? 'bg-blue-50' : ''
                                            }`}
                                        >
                                            <div 
                                                className="p-4 cursor-pointer flex items-start"
                                                onClick={() => setCurrentVideo(idx)}
                                            >
                                                <div className="mr-3 mt-1">
                                                    {currentVideo === idx ? (
                                                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                                            <Play className="w-3 h-3 ml-0.5" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                                            {idx + 1}
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h4 className={`font-medium ${currentVideo === idx ? 'text-blue-700' : 'text-gray-800'}`}>
                                                                {lecture?.title}
                                                            </h4>
                                                            <div className="flex items-center mt-1 text-xs text-gray-500">
                                                                <FileText className="w-3 h-3 mr-1" />
                                                                <span>{getLectureDuration()} • Lecture {idx + 1}</span>
                                                            </div>
                                                        </div>
                                                        
                                                        {role === "ADMIN" && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    onLectureDelete(state?._id, lecture?._id);
                                                                }}
                                                                disabled={isDeleting}
                                                                className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                                                                title="Delete lecture"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100 p-12">
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                <Video className="w-10 h-10 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No lectures available</h3>
                            <p className="text-gray-500 mb-6 text-center max-w-md">
                                This course doesn&apos;t have any lectures yet. 
                                {role === "ADMIN" ? " Add your first lecture to get started." : " Please check back later."}
                            </p>
                            {role === "ADMIN" && (
                                <button
                                    onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Add First Lecture
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default DisplayLectures;