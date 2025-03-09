import { ArrowLeft, Camera, Save, Upload, UserCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        previewImage: "",
        fullName: "",
        avatar: undefined,
        userId: useSelector((state) => state?.auth?.data?._id),
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage,
                });
            });
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!data.fullName || !data.avatar) {
            toast.error("All fields are mandatory");
            return;
        }
        if (data.fullName.length < 5) {
            toast.error("Name cannot be of less than 5 characters");
            return;
        }
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);

        await dispatch(updateProfile([data.userId, formData]));
        await dispatch(getUserData());

        navigate("/user/profile");
    }

    return (
        <HomeLayout>
            <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-teal-600 p-6 flex items-center justify-between">
                        <Link
                            to="/user/profile"
                            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-2xl font-bold text-white text-center flex-grow">
                            Edit Profile
                        </h1>
                    </div>

                    <form onSubmit={onFormSubmit} className="p-6 space-y-6">
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <label
                                    htmlFor="image_uploads"
                                    className="cursor-pointer block relative"
                                >
                                    {data.previewImage ? (
                                        <img
                                            className="w-32 h-32 rounded-full object-cover border-4 border-teal-200 shadow-md group-hover:opacity-80 transition-opacity duration-300"
                                            src={data.previewImage}
                                            alt="Profile"
                                        />
                                    ) : (
                                        <UserCircle
                                            className="w-32 h-32 text-gray-400 group-hover:text-teal-500 transition-colors duration-300"
                                        />
                                    )}
                                    <div className="absolute bottom-0 right-0 bg-teal-600 text-white rounded-full p-2 shadow-md group-hover:bg-teal-700 transition-colors duration-300">
                                        <Camera className="w-5 h-5" />
                                    </div>
                                </label>
                                <input
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    type="file"
                                    id="image_uploads"
                                    name="image_uploads"
                                    accept=".jpg, .png, .svg, .jpeg"
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Upload a new profile picture</p>
                        </div>

                        {/* Name Input */}
                        <div className="space-y-4">
                            <div className="relative">
                                <label
                                    htmlFor="fullName"
                                    className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1"
                                >
                                    <UserCircle className="w-4 h-4 text-teal-600" />
                                    Full Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Enter your full name"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                    value={data.fullName}
                                    onChange={handleInputChange}
                                />
                                <Upload
                                    className="absolute left-3 top-1/2 transform translate-y-1 text-gray-400 w-5 h-5"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                            >
                                <Save className="w-5 h-5" />
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default EditProfile;