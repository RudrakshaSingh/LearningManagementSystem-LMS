import { ArrowRight, BookOpen, ChevronRight, Star, Users } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const featuredCourses = [
        {
            title: "Web Development",
            students: "5k+",
            rating: 5.0,
            price: "₹3000",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
        {
            title: "Data Structure and Algorithms",
            students: "7k+",
            rating: 4.9,
            price: "₹4000",
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
        {
            title: "Mobile App Development",
            students: "1k+",
            rating: 4.7,
            price: "₹3000",
            image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
    ];

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                {/* Hero Section */}
                <div className="pt-16 pb-20 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Text Section */}
                    <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
                        <div className="mb-6">
                            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider bg-teal-100 px-4 py-2 rounded-full inline-block">
                                Learning Management System
                            </span>
                            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                                Elevate Your
                                <span className="block text-teal-600 mt-2">Learning Experience</span>
                            </h1>
                        </div>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                            Unlock in-demand skills with expertly crafted courses. Dive into interactive learning with real-world projects and personalized guidance.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
                            <Link
                                to="/courses"
                                className="group inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                            >
                                Explore Courses
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/contact"
                                className="group inline-flex items-center border-2 border-teal-600 text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-all duration-300 hover:-translate-y-1"
                            >
                                Contact Us
                            </Link>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start gap-6 mt-10">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <img
                                        key={i}
                                        src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                                        alt="User"
                                        className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                                    />
                                ))}
                            </div>
                            <div className="text-sm text-gray-500">
                                <p className="font-semibold text-gray-900">500+ students</p>
                                <p>joined this week</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="lg:w-1/2 flex justify-center relative group">
                        <div className="relative w-full max-w-lg">
                            <div className="absolute -inset-4 bg-teal-100 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                            <img
                                alt="Online Learning Platform"
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                className="relative w-full h-auto rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <Star className="w-6 h-6 text-teal-600" />
                                    <div>
                                        <p className="text-lg font-semibold text-gray-900">4.9/5</p>
                                        <p className="text-xs text-gray-500">Student Rating</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <section className="py-16 bg-white border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: BookOpen, value: "100+", label: "Expert-led Courses" },
                                { icon: Users, value: "10k+", label: "Active Learners" },
                                { icon: Star, value: "4.8", label: "Average Rating" },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center border border-gray-100"
                                >
                                    <div className="inline-flex bg-teal-100 p-3 rounded-lg mb-4">
                                        <stat.icon className="w-6 h-6 text-teal-600" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-teal-600 mb-2">{stat.value}</h3>
                                    <p className="text-gray-600">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Courses Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
                                Featured <span className="text-teal-600">Courses</span>
                            </h2>
                            <Link
                                to="/courses"
                                className="group flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300"
                            >
                                View All Courses
                                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredCourses.map((course, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            {course.price}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{course.title}</h3>
                                        <div className="flex items-center justify-between text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-5 h-5 text-teal-600" />
                                                <span>{course.students}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Star className="w-5 h-5 text-teal-600" />
                                                <span>{course.rating}</span>
                                            </div>
                                        </div>
                                        <Link
                                            to="/courses"
                                            className="mt-4 inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold group"
                                        >
                                            Learn More
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-teal-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent" />
                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Kickstart Your Future?
                        </h2>
                        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                            Join thousands of learners and take the first step toward mastering new skills today.
                        </p>
                        <Link
                            to="/login"
                            className="group inline-flex items-center bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { value: "24/7", label: "Support" },
                                { value: "Lifetime", label: "Access" },
                                { value: "100%", label: "Money Back" },
                                { value: "Certificate", label: "On Completion" },
                            ].map((item, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                                    <p className="text-xl font-semibold">{item.value}</p>
                                    <p className="text-sm text-white/80">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </HomeLayout>
    );
}

export default HomePage;