import { Link } from "react-router-dom";
import HomePageImage from "../Assets/Images/homePageMainImage.png";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
  return (
    <HomeLayout>
      <div className="pt-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[90vh]">
        {/* Text Section */}
        <div className="lg:w-1/2 space-y-6 order-2 lg:order-1 text-center lg:text-left">
          <div className="mb-8">
            <span className="text-amber-400 font-bold text-lg uppercase tracking-wide">
              Learning Management System
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              Transform Your 
              <span className="block mt-2">Learning Experience</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl">
            Join our cutting-edge LMS platform offering curated courses from 
            industry experts. Enhance your skills with interactive content 
            and personalized learning paths.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
            <Link to="/courses" className="group relative">
              <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-amber-500/30">
                Explore Courses
                <span className="absolute -inset-0.5 bg-amber-500/30 blur-lg group-hover:opacity-50 transition-opacity duration-300"></span>
              </button>
            </Link>
            <Link to="/contact" className="group relative">
              <button className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-amber-500/20">
                Contact Us
                <span className="absolute -inset-0.5 bg-amber-500/10 blur-lg group-hover:opacity-50 transition-opacity duration-300"></span>
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex items-center justify-center order-1 lg:order-2 relative group">
          <div className="relative before:absolute before:-inset-4 before:bg-gradient-to-tr before:from-amber-400/30 before:via-transparent before:to-purple-400/30 before:rounded-3xl before:blur-xl">
            <img
              alt="Online Learning Platform"
              src={HomePageImage}
              className="max-w-full h-auto rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-102 relative z-10"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;