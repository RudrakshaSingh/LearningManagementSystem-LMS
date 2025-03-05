import { Award, BookOpen, CheckCircle,Rocket, Users } from "lucide-react";
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
		{
			icon: Users,
			value: "100K+",
			label: "Active Learners",
			bgColor: "bg-blue-400/10",
			textColor: "text-blue-400"
		},
		{
			icon: BookOpen,
			value: "500+",
			label: "Courses Available",
			bgColor: "bg-green-400/10",
			textColor: "text-green-400"
		},
		{
			icon: Award,
			value: "95%",
			label: "Success Rate",
			bgColor: "bg-purple-400/10",
			textColor: "text-purple-400"
		},
		{
			icon: Rocket,
			value: "10K+",
			label: "Career Transitions",
			bgColor: "bg-orange-400/10",
			textColor: "text-orange-400"
		}
	];

	return (
		<HomeLayout>
			<div className="relative overflow-hidden bg-gray-950 text-white">
				{/* Hero Section */}
				<section className="pt-20 pb-24 bg-gradient-to-br from-gray-900/80 via-blue-900/80 to-gray-800/80">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8 text-center lg:text-left">
							<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
								Redefining Online Education
							</h1>
							<p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
								Empowering global learners through cutting-edge, personalized educational experiences that transform potential into achievement.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
								<button className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/30">
									Explore Courses
								</button>
								<button className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20">
									Meet Instructors
								</button>
							</div>
						</div>
						<div className="relative group flex justify-center">
							<div className="relative overflow-hidden rounded-3xl shadow-2xl">
								<div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 via-transparent to-purple-400/20 opacity-75 blur-2xl"></div>
								<img
									alt="Education Platform"
									src={aboutMainImage}
									className="relative z-10 max-w-full h-auto rounded-3xl transform transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className="py-16 bg-gray-900/50 backdrop-blur-sm">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{statsData.map((stat, index) => (
								<div 
									key={index} 
									className="bg-gray-800/60 border border-gray-700/50 p-6 rounded-2xl text-center transition-all duration-300 hover:bg-gray-800/80 hover:scale-105 group"
								>
									<div className={`inline-block ${stat.bgColor} p-4 rounded-2xl mb-4 group-hover:rotate-6 transition-transform`}>
										<stat.icon className={`w-8 h-8 ${stat.textColor}`} />
									</div>
									<h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
									<p className="text-gray-400">{stat.label}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Mission Statement */}
				<section className="py-16 bg-gradient-to-br from-purple-900/80 to-blue-900/80">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4">
								Our Educational Philosophy
							</h2>
							<p className="text-lg text-gray-300 max-w-3xl mx-auto">
								Bridging the gap between ambition and achievement through innovative, personalized learning solutions
							</p>
						</div>
						<div className="grid md:grid-cols-2 gap-12">
							<div className="space-y-8">
								<h3 className="text-2xl font-bold text-cyan-400">Why Choose Us?</h3>
								<ul className="space-y-6">
									{[
										{
											title: "Expert-Curated Curriculum",
											description: "Cutting-edge, industry-relevant content updated in real-time"
										},
										{
											title: "Interactive Learning",
											description: "Immersive live sessions, collaborative peer discussions & mentorship"
										},
										{
											title: "Career Support",
											description: "Comprehensive resume building, interview prep, and career guidance"
										}
									].map((feature, index) => (
										<li key={index} className="flex items-start space-x-4">
											<CheckCircle className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
											<div>
												<h4 className="text-lg font-semibold text-white">
													{feature.title}
												</h4>
												<p className="text-gray-400">{feature.description}</p>
											</div>
										</li>
									))}
								</ul>
							</div>
							<div className="carousel bg-white/5 border border-white/10 shadow-xl rounded-2xl overflow-hidden">
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
				<section className="bg-gradient-to-br from-cyan-500/80 to-purple-600/80 py-16">
					<div className="max-w-4xl mx-auto px-4 text-center">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
							Transform Your Future, Start Learning Today
						</h2>
						<p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
							Join thousands of learners who&apos;ve revolutionized their careers through our innovative platform
						</p>
						<Link
							to="/login"
							className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-cyan-500/30"
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