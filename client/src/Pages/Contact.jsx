import { useState } from "react";
import { toast } from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.email || !userInput.name || !userInput.message) {
            toast.error("All fields are mandatory");
            return;
        }

        if (!isEmail(userInput.email)) {
            toast.error("Invalid email");
            return;
        }

        try {
            const response = axiosInstance.post("/contact", userInput);
            toast.promise(response, {
                loading: "Submitting your message...",
                success: "Form submitted successfully",
                error: "Failed to submit the form",
            });
            const contactResponse = await response;
            if (contactResponse?.data?.success) {
                setUserInput({
                    name: "",
                    email: "",
                    message: "",
                });
            }
        } catch (err) {
            toast.error("operation failed....");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
                <div className="w-full max-w-md">
                    <form
                        noValidate
                        onSubmit={onFormSubmit}
                        className="bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-700 transform transition-all duration-300 hover:scale-105"
                    >
                        <div className="text-center mb-6">
                            <h1 className="text-4xl font-bold text-white tracking-wide">
                                Contact Us
                            </h1>
                            <p className="text-gray-400 mt-2">
                                We&apos;d love to hear from you
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label 
                                    htmlFor="name" 
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    onChange={handleInputChange}
                                    value={userInput.name}
                                />
                            </div>

                            <div>
                                <label 
                                    htmlFor="email" 
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onChange={handleInputChange}
                                    value={userInput.email}
                                />
                            </div>

                            <div>
                                <label 
                                    htmlFor="message" 
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-40 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                                    id="message"
                                    name="message"
                                    placeholder="Enter your message"
                                    onChange={handleInputChange}
                                    value={userInput.message}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-500 transition-all ease-in-out duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Contact;