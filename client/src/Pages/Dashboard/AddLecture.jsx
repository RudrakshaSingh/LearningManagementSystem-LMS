/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeft, FileVideo, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";

function AddLecture() {
    const courseDetails = useLocation().state;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    }

    function handleVideo(e) {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.lecture || !userInput.title || !userInput.description) {
            toast.error("All fields are mandatory");
            return;
        }
        
        setIsSubmitting(true);
        const response = await dispatch(addCourseLecture(userInput));
        setIsSubmitting(false);
        
        if (response?.payload?.success) {
            toast.success("Lecture added successfully");
            navigate(-1);
            setUserInput({
                id: courseDetails?._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: "",
            });
        }
    }

    useEffect(() => {
        if (!courseDetails) navigate("/courses");
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-gray-50 py-10 px-4 md:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Course Header */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                        <div className="flex items-center gap-4">
                            <button 
                                className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-50"
                                onClick={() => navigate(-1)}
                                title="Go back"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Add New Lecture</h1>
                                <p className="text-gray-500 mt-1">
                                    Course: {courseDetails?.title || "Unknown Course"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Lecture Form */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <form onSubmit={onFormSubmit} className="p-6">
                            <div className="space-y-6">
                                {/* Title Input */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Lecture Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Enter the title of the lecture"
                                        onChange={handleInputChange}
                                        value={userInput.title}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        required
                                    />
                                </div>

                                {/* Description Input */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                        Lecture Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Enter the description of the lecture"
                                        onChange={handleInputChange}
                                        value={userInput.description}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-32 resize-y"
                                        required
                                    />
                                </div>

                                {/* Video Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Lecture Video <span className="text-red-500">*</span>
                                    </label>
                                    
                                    {userInput.videoSrc ? (
                                        <div className="space-y-3">
                                            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                                <video
                                                    muted
                                                    src={userInput.videoSrc}
                                                    controls
                                                    controlsList="nodownload nofullscreen"
                                                    disablePictureInPicture
                                                    className="w-full h-full object-contain"
                                                ></video>
                                            </div>
                                            <div className="text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => setUserInput({...userInput, lecture: undefined, videoSrc: ""})}
                                                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                                                >
                                                    Choose Different Video
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer p-6">
                                            <label htmlFor="lecture" className="flex flex-col items-center justify-center cursor-pointer">
                                                <FileVideo className="w-12 h-12 text-gray-400 mb-2" />
                                                <div className="text-center">
                                                    <span className="font-medium text-blue-600">Click to upload</span>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        MP4, WebM, Ogg formats supported
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    id="lecture"
                                                    name="lecture"
                                                    onChange={handleVideo}
                                                    accept="video/mp4 video/x-mp4 video/*"
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4 mr-2" />
                                                Add New Lecture
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AddLecture;