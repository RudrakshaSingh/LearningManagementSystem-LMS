import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutFailure() {
    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-teal-50 py-16 px-4 sm:px-8 lg:px-16 flex items-center justify-center">
                <div className="max-w-7xl mx-auto">
                    <div className="w-96 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                        <div className="bg-red-500 py-6 px-6">
                            <h1 className="text-center text-2xl font-bold text-white">
                                Payment Failed
                            </h1>
                        </div>
                        
                        <div className="px-8 py-12 flex flex-col items-center justify-center space-y-6">
                            <RxCrossCircled className="text-red-500 text-7xl" />
                            
                            <div className="text-center space-y-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Oops! Your payment failed
                                </h2>
                                
                                <p className="text-gray-600 text-lg">
                                    Something went wrong with your transaction. Please try again later.
                                </p>
                            </div>
                        </div>

                        <div className="px-8 pb-8">
                            <Link to="/checkout" className="block w-full">
                                <button className="w-full bg-red-500 hover:bg-red-600 text-white text-xl font-semibold py-3 px-6 rounded-full transition-all duration-300 focus:ring-2 focus:ring-red-400 focus:ring-opacity-50">
                                    Try again
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CheckoutFailure;