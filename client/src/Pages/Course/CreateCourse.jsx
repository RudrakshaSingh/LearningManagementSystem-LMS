import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage,
                });
            });
        }
    }

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        if (
            !userInput.title ||
            !userInput.description ||
            !userInput.category ||
            !userInput.thumbnail ||
            !userInput.createdBy
        ) {
            toast.error("All fields are mandatory");
            return;
        }

        const response = await dispatch(createNewCourse(userInput));
        if (response?.payload?.success) {
            setUserInput({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: "",
            });
            navigate("/courses");
        }
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-teal-50 py-16 px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <Link 
                            to="/courses" 
                            className="flex items-center text-teal-600 hover:text-teal-800 mb-6"
                        >
                            <ChevronLeft className="mr-2" /> Back to Courses
                        </Link>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
                            Create New <span className="text-teal-600">Course</span>
                        </h1>

                        <form onSubmit={onFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label 
                                        htmlFor="image_uploads" 
                                        className="cursor-pointer block"
                                    >
                                        {userInput.previewImage ? (
                                            <img 
                                                className="w-full h-64 object-cover rounded-lg border-2 border-teal-200" 
                                                src={userInput.previewImage} 
                                                alt="Course Thumbnail" 
                                            />
                                        ) : (
                                            <div className="w-full h-64 m-auto flex items-center justify-center rounded-lg border-2 border-teal-200 bg-teal-50">
                                                <p className="text-teal-600 font-semibold text-lg">
                                                    Upload Course Thumbnail
                                                </p>
                                            </div>
                                        )}
                                    </label>
                                    <input
                                        className="hidden"
                                        type="file"
                                        id="image_uploads"
                                        accept=".jpg, .jpeg, .png"
                                        name="image_uploads"
                                        onChange={handleImageUpload}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label 
                                            className="block text-gray-700 font-semibold mb-2" 
                                            htmlFor="title"
                                        >
                                            Course Title
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="title"
                                            id="title"
                                            placeholder="Enter course title"
                                            className="w-full px-4 py-3 rounded-full border border-teal-200 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300"
                                            value={userInput.title}
                                            onChange={handleUserInput}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label 
                                        className="block text-gray-700 font-semibold mb-2" 
                                        htmlFor="createdBy"
                                    >
                                        Course Instructor
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="createdBy"
                                        id="createdBy"
                                        placeholder="Enter course instructor"
                                        className="w-full px-4 py-3 rounded-full border border-teal-200 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300"
                                        value={userInput.createdBy}
                                        onChange={handleUserInput}
                                    />
                                </div>

                                <div>
                                    <label 
                                        className="block text-gray-700 font-semibold mb-2" 
                                        htmlFor="category"
                                    >
                                        Course Category
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="category"
                                        id="category"
                                        placeholder="Enter course category"
                                        className="w-full px-4 py-3 rounded-full border border-teal-200 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300"
                                        value={userInput.category}
                                        onChange={handleUserInput}
                                    />
                                </div>

                                <div>
                                    <label 
                                        className="block text-gray-700 font-semibold mb-2" 
                                        htmlFor="description"
                                    >
                                        Course Description
                                    </label>
                                    <textarea
                                        required
                                        name="description"
                                        id="description"
                                        placeholder="Enter course description"
                                        className="w-full px-4 py-3 h-32 rounded-lg border border-teal-200 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300 resize-none"
                                        value={userInput.description}
                                        onChange={handleUserInput}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-full bg-teal-600 text-white font-semibold text-lg hover:bg-teal-700 transition-all duration-300 ease-in-out"
                                >
                                    Create Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CreateCourse;