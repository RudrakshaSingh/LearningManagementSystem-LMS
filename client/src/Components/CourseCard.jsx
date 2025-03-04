import { 
    BookOpen, 
    PlayCircle, 
    Tag, 
    UserCircle} from "lucide-react";
import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate("/course/description/", { state: { ...data } })}
            className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-teal-100 hover:border-teal-300 transition-all duration-300">
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        src={data?.thumbnail?.secure_url}
                        alt="course thumbnail"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Course Details */}
                <div className="p-6 space-y-3">
                    <h2 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-teal-600 transition-colors">
                        {data?.title}
                    </h2>

                    <div className="space-y-2">
                        <div className="flex items-center text-gray-600 text-sm">
                            <UserCircle className="w-5 h-5 mr-2 text-teal-500" />
                            <span className="font-medium">{data?.createdBy}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600 text-sm">
                            <Tag className="w-5 h-5 mr-2 text-teal-500" />
                            <span className="font-medium">{data?.category}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600 text-sm">
                            <PlayCircle className="w-5 h-5 mr-2 text-teal-500" />
                            <span className="font-medium">{data?.numbersOfLectures} Lectures</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-sm line-clamp-3 mt-3">
                        {data?.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-4 flex justify-between items-center">
                        <button className="flex items-center text-teal-600 hover:text-teal-800 transition-colors">
                            <BookOpen className="w-5 h-5 mr-2" />
                            View Course
                        </button>
                        <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold">
                            Explore
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;