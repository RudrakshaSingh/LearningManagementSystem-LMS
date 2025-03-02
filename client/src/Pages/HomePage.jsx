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
			image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
		},
		{
			title: "Data Structure and Algorithms",
			students: "7k+",
			rating: 4.9,
			price: "₹4000",
			image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
		},
		{
			title: "Mobile App Development",
			students: "1k+",
			rating: 4.7,
			price: "₹3000",
			image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
		},
	];

	return (
		<HomeLayout>
			<div className="min-h-screen bg-gray-950 text-white">
				{/* Hero Section */}
				<div className="pt-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[90vh]">
					{/* Text Section */}
					<div className="lg:w-1/2 space-y-6 order-2 lg:order-1 text-center lg:text-left">
						<div className="mb-8 relative">
							<div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -z-10" />
							<span className="text-amber-400 font-bold text-lg uppercase tracking-wide bg-amber-400/10 px-4 py-2 rounded-full inline-block">
								Learning Management System
							</span>
							<h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
								Transform Your
								<span className="block mt-3">Learning Journey</span>
							</h1>
						</div>

						<p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
							Master in-demand skills with industry-relevant courses curated by experts. Experience
							interactive learning with personalized mentorship and real-world projects.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
							<Link to="/courses" className="group relative bg-amber-500 hover:bg-amber-600 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-amber-500/30 flex items-center gap-2">
								Explore Courses
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								<span className="absolute -inset-0.5 bg-amber-500/30 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
							</Link>
							<Link to="/contact" className="group relative border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-amber-500/20">
								Contact Us
								<span className="absolute -inset-0.5 bg-amber-500/10 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
							</Link>
						</div>

						<div className="flex items-center justify-center lg:justify-start gap-4 mt-8 pt-4">
							<div className="flex -space-x-2">
								{[1, 2, 3, 4].map((i) => (
									<div
										key={i}
										className="w-10 h-10 rounded-full border-2 border-gray-900 overflow-hidden">
										<img
											src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
											alt="User"
											className="w-full h-full object-cover"
										/>
									</div>
								))}
							</div>
							<div className="text-sm text-gray-400">
								<p className="font-semibold text-white">500+ students</p>
								<p>joined this week</p>
							</div>
						</div>
					</div>

					{/* Image Section */}
					<div className="lg:w-1/2 flex items-center justify-center order-1 lg:order-2 relative group">
						<div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
						<div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-10" />
						<div className="relative before:absolute before:-inset-4 before:bg-gradient-to-tr before:from-amber-400/30 before:via-transparent before:to-purple-400/30 before:rounded-3xl before:blur-xl">
							<img
								alt="Online Learning Platform"
								src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
								className="max-w-full h-auto rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105 relative z-10"
							/>
							<div className="absolute -right-8 -bottom-8 bg-gray-900 rounded-2xl p-4 shadow-xl z-20 transform transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2">
								<div className="flex items-center gap-3">
									<div className="bg-amber-400/20 p-3 rounded-xl">
										<Star className="w-6 h-6 text-amber-400" />
									</div>
									<div>
										<p className="text-lg font-bold text-white">4.9/5.0</p>
										<p className="text-sm text-gray-400">Student Rating</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Stats Section */}
				<section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 relative overflow-hidden">
					<div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
						<div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
						<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
					</div>
					<div className="max-w-6xl mx-auto px-4 relative z-10">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 p-8 rounded-2xl shadow-xl text-center hover:transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-gray-700/50">
								<div className="inline-block bg-amber-400/10 p-4 rounded-2xl mb-4">
									<BookOpen className="w-8 h-8 text-amber-400" />
								</div>
								<h3 className="text-4xl font-bold text-amber-400 mb-2">100+</h3>
								<p className="text-gray-300">Expert-led Courses</p>
							</div>

							<div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 p-8 rounded-2xl shadow-xl text-center hover:transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-gray-700/50">
								<div className="inline-block bg-amber-400/10 p-4 rounded-2xl mb-4">
									<Users className="w-8 h-8 text-amber-400" />
								</div>
								<h3 className="text-4xl font-bold text-amber-400 mb-2">10k+</h3>
								<p className="text-gray-300">Active Learners</p>
							</div>

							<div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 p-8 rounded-2xl shadow-xl text-center hover:transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-gray-700/50">
								<div className="inline-block bg-amber-400/10 p-4 rounded-2xl mb-4">
									<Star className="w-8 h-8 text-amber-400" />
								</div>
								<h3 className="text-4xl font-bold text-amber-400 mb-2">4.8</h3>
								<p className="text-gray-300">Average Rating</p>
							</div>
						</div>
					</div>
				</section>

				{/* Featured Courses Section */}
				<section className="py-16 bg-gray-950 relative">
					<div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
						<div className="absolute top-40 left-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
						<div className="absolute bottom-40 right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
					</div>
					<div className="max-w-6xl mx-auto px-4 relative z-10">
						<div className="flex flex-col md:flex-row justify-between items-center mb-12">
							<h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent mb-4 md:mb-0">
								Featured Courses
							</h2>
							<button className="flex items-center gap-2 text-amber-400 hover:text-amber-300 group transition-colors">
								View All Courses
								<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{featuredCourses.map((course, index) => (
								<div
									key={index}
									className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm border border-gray-700/50">
									<div className="relative overflow-hidden h-48">
										<img
											src={course.image}
											alt={course.title}
											className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
										<div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
											<span className="bg-amber-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
												{course.price}
											</span>
											<button className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20">
												<ArrowRight className="w-5 h-5" />
											</button>
										</div>
									</div>

									<div className="p-6">
										<h3 className="text-xl font-semibold text-gray-100 mb-3">{course.title}</h3>
										<div className="flex items-center justify-between text-gray-400">
											<div className="flex items-center gap-2">
												<Users className="w-5 h-5 text-amber-400" />
												<span>{course.students}</span>
											</div>
											<div className="flex items-center gap-2">
												<Star className="w-5 h-5 text-amber-400" />
												<span>{course.rating}</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="relative py-20 overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-purple-600 opacity-90" />
					<div className="absolute top-0 left-0 w-full h-full overflow-hidden">
						<div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
						<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
					</div>
					<div className="max-w-4xl mx-auto px-4 text-center relative z-10">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
							Ready to Transform Your Career?
						</h2>
						<p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
							Join our community of passionate learners and unlock your full potential.
						</p>
						<Link
							to="/login"
							className="group relative inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-amber-400 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-gray-900/30">
							Start Learning Now
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</Link>

						<div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
								<p className="text-2xl font-bold text-white">24/7</p>
								<p className="text-white/80 text-sm">Support</p>
							</div>
							<div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
								<p className="text-2xl font-bold text-white">Lifetime</p>
								<p className="text-white/80 text-sm">Access</p>
							</div>
							<div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
								<p className="text-2xl font-bold text-white">100%</p>
								<p className="text-white/80 text-sm">Money Back</p>
							</div>
							<div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
								<p className="text-2xl font-bold text-white">Certificate</p>
								<p className="text-white/80 text-sm">On Completion</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</HomeLayout>
	);
}

export default HomePage;
