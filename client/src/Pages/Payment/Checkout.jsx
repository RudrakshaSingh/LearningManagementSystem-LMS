/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    const userData = useSelector((state) => state?.auth?.data);
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: "",
    };

    async function handleSubscription(e) {
        e.preventDefault();
        if (!razorpayKey || !subscription_id) {
            toast.error("Something went wrong");
            return;
        }
        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Coursify Pvt. Ltd.",
            description: "Subscription",
            theme: {
                color: "#0D9488", // Teal color to match the theme
            },
            prefill: { email: userData.email, name: userData.fullName },

            handler: async function (response) {//jab options acchi tarah submiut hoga hme handler wapas milega
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                toast.success("Payment successful");

                const res = await dispatch(verifyUserPayment(paymentDetails));
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail");
            },
        };
        //to open a new razorpay window
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load() {
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-teal-50 py-16 px-4 sm:px-8 lg:px-16 flex items-center justify-center">
                <div className="max-w-7xl mx-auto">
                    <form onSubmit={handleSubscription} className="flex items-center justify-center">
                        <div className="w-96 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                            <div className="bg-teal-600 py-6 px-6">
                                <h1 className="text-center text-2xl font-bold text-white">
                                    Subscription Bundle
                                </h1>
                            </div>
                            
                            <div className="px-8 py-10 space-y-6">
                                <div className="text-center space-y-4">
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        This purchase will allow you to access all available courses on our platform for{" "}
                                        <span className="text-teal-600 font-bold">
                                            1 Year duration
                                        </span>
                                    </p>
                                    <p className="text-gray-600">
                                        All existing and newly launched courses will be available to you.
                                    </p>
                                </div>

                                <div className="flex items-center justify-center">
                                    <div className="bg-teal-50 px-8 py-4 rounded-full">
                                        <p className="flex items-center text-3xl font-bold text-teal-600">
                                            <BiRupee />
                                            <span>3</span>
                                            <span className="text-lg ml-1">only</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="text-gray-500 text-sm text-center space-y-1">
                                    <p>100% refund on cancellation</p>
                                    <p>* Terms and conditions applied *</p>
                                </div>
                            </div>

                            <div className="px-8 pb-8">
                                <button
                                    type="submit"
                                    className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xl font-semibold py-3 px-6 rounded-full transition-all duration-300 focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
                                >
                                    Buy now
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Checkout;