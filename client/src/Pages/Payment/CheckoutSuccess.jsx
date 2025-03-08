import { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";

function CheckoutSuccess() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
    });

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-teal-50 py-16 px-4 sm:px-8 lg:px-16 flex items-center justify-center">
                <div className="max-w-7xl mx-auto">
                    <div className="w-96 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                        <div className="bg-teal-600 py-6 px-6">
                            <h1 className="text-center text-2xl font-bold text-white">
                                Payment Successful
                            </h1>
                        </div>
                        
                        <div className="px-8 py-12 flex flex-col items-center justify-center space-y-6">
                            <AiFillCheckCircle className="text-teal-600 text-7xl" />
                            
                            <div className="text-center space-y-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Welcome to the Pro Bundle
                                </h2>
                                
                                <p className="text-gray-600 text-lg">
                                    Now you can enjoy all the courses on our platform. Your subscription has been activated.
                                </p>
                            </div>
                        </div>

                        <div className="px-8 pb-8">
                            <Link to="/" className="block w-full">
                                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xl font-semibold py-3 px-6 rounded-full transition-all duration-300 focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50">
                                    Go to dashboard
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CheckoutSuccess;