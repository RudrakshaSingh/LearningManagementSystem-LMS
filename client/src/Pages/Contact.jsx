import { Mail, MessageSquare, User } from "lucide-react";
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
            toast.error("Operation failed...");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 p-4">
                <div className="w-full max-w-md">
                    <form
                        noValidate
                        onSubmit={onFormSubmit}
                        className="flex flex-col justify-center gap-6 rounded-2xl p-8 bg-white shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Get in Touch
                            </h1>
                            <p className="text-gray-500 text-sm">
                                We’re here to assist you
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="relative">
                                <label
                                    htmlFor="name"
                                    className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2"
                                >
                                    <User className="w-4 h-4 text-teal-600" />
                                    Name
                                </label>
                                <input
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    onChange={handleInputChange}
                                    value={userInput.name}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="email"
                                    className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2"
                                >
                                    <Mail className="w-4 h-4 text-teal-600" />
                                    Email
                                </label>
                                <input
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    onChange={handleInputChange}
                                    value={userInput.email}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="message"
                                    className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2"
                                >
                                    <MessageSquare className="w-4 h-4 text-teal-600" />
                                    Message
                                </label>
                                <textarea
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200 h-32 resize-none"
                                    id="message"
                                    name="message"
                                    placeholder="How can we help you?"
                                    onChange={handleInputChange}
                                    value={userInput.message}
                                />
                                <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                                    <MessageSquare className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
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