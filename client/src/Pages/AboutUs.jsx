import { Award, BookOpen, CheckCircle, Rocket, Users } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const statsData = [
        { icon: Users, value: "100K+", label: "Active Learners", bgColor: "bg-teal-100", textColor: "text-teal-600" },
        { icon: BookOpen, value: "500+", label: "Courses Available", bgColor: "bg-teal-100", textColor: "text-teal-600" },
        { icon: Award, value: "95%", label: "Success Rate", bgColor: "bg-teal-100", textColor: "text-teal-600" },
        { icon: Rocket, value: "10K+", label: "Career Transitions", bgColor: "bg-teal-100", textColor: "text-teal-600" },
    ];

    return (
        <HomeLayout>
            <div className="relative bg-gray-50 text-gray-900">
                {/* Hero Section */}
                <section className="pt-20 pb-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
                                Redefining
                                <span className="block text-teal-600 mt-2">Online Education</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Empowering global learners with personalized, cutting-edge educational experiences.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    to="/courses"
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                                >
                                    Explore Courses
                                </Link>
                                <Link
                                    to="/contact"
                                    className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1"
                                >
                                    Meet Instructors
                                </Link>
                            </div>
                        </div>
                        <div className="relative group flex justify-center">
                            <div className="relative w-full max-w-lg">
                                <div className="absolute -inset-4 bg-teal-100 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                                <img
                                    alt="Education Platform"
                                    src={aboutMainImage}
                                    className="relative w-full h-auto rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {statsData.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center border border-gray-100"
                                >
                                    <div className={`inline-flex ${stat.bgColor} p-3 rounded-lg mb-4`}>
                                        <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-teal-600 mb-2">{stat.value}</h3>
                                    <p className="text-gray-600">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mission Statement */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Our <span className="text-teal-600">Philosophy</span>
                            </h2>
                            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                                Bridging ambition and achievement with innovative learning solutions.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <h3 className="text-2xl font-semibold text-gray-900">Why Choose Us?</h3>
                                <ul className="space-y-6">
                                    {[
                                        {
                                            title: "Expert-Curated Curriculum",
                                            description: "Cutting-edge, industry-relevant content updated in real-time",
                                        },
                                        {
                                            title: "Interactive Learning",
                                            description: "Immersive live sessions, peer discussions & mentorship",
                                        },
                                        {
                                            title: "Career Support",
                                            description: "Resume building, interview prep, and career guidance",
                                        },
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-start space-x-4">
                                            <CheckCircle className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-900">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-gray-600">{feature.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="carousel bg-gray-50 border border-gray-200 shadow-md rounded-2xl overflow-hidden">
                                {celebrities &&
                                    celebrities.map((celebrity) => (
                                        <CarouselSlide
                                            {...celebrity}
                                            key={celebrity.slideNumber}
                                            totalSlides={celebrities.length}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-teal-600 text-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Start Your Journey Today
                        </h2>
                        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                            Join thousands revolutionizing their careers with us.
                        </p>
                        <Link
                            to="/login"
                            className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Get Started Now
                        </Link>
                    </div>
                </section>
            </div>
        </HomeLayout>
    );
}

export default AboutUs;