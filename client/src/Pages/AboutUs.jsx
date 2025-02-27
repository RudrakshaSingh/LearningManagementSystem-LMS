import { Award, BookOpen, Rocket, Users } from "lucide-react";
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
	return (
		<HomeLayout>
			<div className="relative overflow-hidden">
				{/* Hero Section */}
				<section className="pt-20 pb-24 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8 text-center lg:text-left">
							<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
								Redefining Online Education
							</h1>
							<p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
								Empowering global learners through accessible, high-quality education. Join our
								community where knowledge meets innovation.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
								<button className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-amber-500/30">
									Explore Courses
								</button>
								<button className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-amber-500/20">
									Meet Instructors
								</button>
							</div>
						</div>
						<div className="relative group flex justify-center">
							<div className="relative before:absolute before:-inset-4 before:bg-gradient-to-tr before:from-amber-400/30 before:via-transparent before:to-purple-400/30 before:rounded-3xl before:blur-xl">
								<img
									alt="Education Platform"
									src={aboutMainImage}
									className="max-w-full h-auto rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-102 relative z-10"
								/>
							</div>
							<div className="absolute -bottom-8 -right-8 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className="py-16 bg-gray-900">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							<div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-2xl text-center hover:transform hover:scale-105 transition-all duration-300">
								<div className="inline-block bg-amber-400/10 p-4 rounded-2xl mb-4">
									<Users className="w-8 h-8 text-amber-400" />
								</div>
								<h3 className="text-3xl font-bold text-amber-400 mb-2">100K+</h3>
								<p className="text-gray-300">Active Learners</p>
							</div>
							<div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-2xl text-center hover:transform hover:scale-105 transition-all duration-300">
								<div className="inline-block bg-amber-400/10 p-4 rounded-2xl mb-4">
									<BookOpen className="w-8 h-8 text-amber-400" />
								</div>
								<h3 className="text-3xl font-bold text-amber-400 mb-2">500+</h3>
								<p className="text-gray-300">Courses Available</p>
							</div>
							<div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-2xl text-center hover:transform hover:scale-105 transition-all duration-300">
								<div className="inline-block bg-amber-400/10 p-4 rounded-2xl mb-4">
									<Award className="w-8 h-8 text-amber-400" />
								</div>
								<h3 className="text-3xl font-bold text-amber-400 mb-2">95%</h3>
								<p className="text-gray-300">Success Rate</p>
							</div>
							<div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-2xl text-center hover:transform hover:scale-105 transition-all duration-300">
								<div className="inline-block bg-amber-400/10 p-4 rounded-2xl mb-4">
									<Rocket className="w-8 h-8 text-amber-400" />
								</div>
								<h3 className="text-3xl font-bold text-amber-400 mb-2">10K+</h3>
								<p className="text-gray-300">Career Transitions</p>
							</div>
						</div>
					</div>
				</section>

				{/* Mission Statement */}
				<section className="py-16 bg-gradient-to-br from-purple-900 to-blue-900">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent mb-4">
								Our Educational Philosophy
							</h2>
							<p className="text-lg text-gray-300 max-w-3xl mx-auto">
								Bridging the gap between ambition and achievement through innovative learning solutions
							</p>
						</div>
						<div className="grid md:grid-cols-2 gap-12">
							<div className="space-y-8">
								<h3 className="text-2xl font-bold text-amber-400">Why Choose Us?</h3>
								<ul className="space-y-6">
									<li className="flex items-start space-x-4">
										<div className="bg-amber-400/10 p-2 rounded-lg">
											<span className="text-amber-400 text-xl">✓</span>
										</div>
										<div>
											<h4 className="text-lg font-semibold text-gray-100">
												Expert-Curated Curriculum
											</h4>
											<p className="text-gray-300">Industry-relevant content updated regularly</p>
										</div>
									</li>
									<li className="flex items-start space-x-4">
										<div className="bg-amber-400/10 p-2 rounded-lg">
											<span className="text-amber-400 text-xl">✓</span>
										</div>
										<div>
											<h4 className="text-lg font-semibold text-gray-100">
												Interactive Learning
											</h4>
											<p className="text-gray-300">
												Live sessions, peer discussions & mentorship
											</p>
										</div>
									</li>
									<li className="flex items-start space-x-4">
										<div className="bg-amber-400/10 p-2 rounded-lg">
											<span className="text-amber-400 text-xl">✓</span>
										</div>
										<div>
											<h4 className="text-lg font-semibold text-gray-100">Career Support</h4>
											<p className="text-gray-300">Resume building & interview preparation</p>
										</div>
									</li>
								</ul>
							</div>
							<div className="carousel bg-white/10  shadow-lg shadow-900/30 rounded-2xl ">
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
				<section className="bg-gradient-to-br from-amber-500 to-purple-600 py-16">
					<div className="max-w-4xl mx-auto px-4 text-center">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
							Start Your Learning Journey Today
						</h2>
						<p className="text-lg text-gray-900/90 mb-8 max-w-2xl mx-auto">
							Join thousands who&apos;ve transformed their careers through our platform
						</p>
						<Link
							to="/"
							className="bg-gray-900 hover:bg-gray-800 text-amber-400 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-gray-900/30">
							Get Started Now
						</Link>
					</div>
				</section>
			</div>
		</HomeLayout>
	);
}

export default AboutUs;
