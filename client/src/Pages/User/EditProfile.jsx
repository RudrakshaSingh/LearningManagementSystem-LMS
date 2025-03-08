import { 
  ArrowLeft, 
  Camera, 
  Save, 
  Upload, 
  UserCircle} from "lucide-react";
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

        await dispatch(updateProfile([data.userId, formData]));//can only send one parameter to createAsyncThunk

        await dispatch(getUserData());//updating user state

        navigate("/user/profile");
    }

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-gradient-to-br from-gray-800/80 to-gray-700/80 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 backdrop-blur-sm">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-amber-400/20 to-purple-400/20 p-6 flex items-center justify-between">
                        <Link 
                            to="/user/profile" 
                            className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6 text-amber-400" />
                        </Link>
                        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-center flex-grow">
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
                                            className="w-36 h-36 rounded-full object-cover border-4 border-amber-400/30 shadow-lg group-hover:opacity-70 transition-opacity"
                                            src={data.previewImage} 
                                            alt="Profile"
                                        />
                                    ) : (
                                        <UserCircle 
                                            className="w-36 h-36 text-gray-600 group-hover:text-amber-400 transition-colors"
                                        />
                                    )}
                                    <div className="absolute bottom-0 right-0 bg-amber-400 text-gray-900 rounded-full p-2 shadow-lg group-hover:bg-amber-500 transition-colors">
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
                            <p className="mt-2 text-sm text-gray-400">Click to upload profile picture</p>
                        </div>

                        {/* Name Input */}
                        <div className="space-y-4">
                            <div>
                                <label 
                                    htmlFor="fullName" 
                                    className=" text-sm font-medium text-gray-300 mb-2 flex items-center"
                                >
                                    <UserCircle className="mr-2 w-5 h-5 text-amber-400" />
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        required
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        placeholder="Enter your full name"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300"
                                        value={data.fullName}
                                        onChange={handleInputChange}
                                    />
                                    <Upload 
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center bg-gradient-to-r from-amber-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-amber-500/30"
                            >
                                <Save className="mr-2 w-5 h-5" />
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