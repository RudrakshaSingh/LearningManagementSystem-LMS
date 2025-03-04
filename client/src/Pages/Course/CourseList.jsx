import { ChevronLeft, ChevronRight,Search } from "lucide-react";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);

    // State for search and pagination
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Load courses on component mount
    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []); 

    // Filter courses based on search term
    const filteredCourses = courseData?.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-teal-50 py-16 px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    {/* Search and Filter Section */}
                    <div className="mb-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
                            Explore Courses <span className="text-teal-600">by Industry Experts</span>
                        </h1>
                        <div className="relative w-full max-w-md">
                            <input 
                                type="text" 
                                placeholder="Search courses..." 
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page on new search
                                }}
                                className="w-full px-4 py-3 pl-10 rounded-full border border-teal-200 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500" />
                        </div>
                    </div>

                    {/* Courses Grid */}
                    {currentCourses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {currentCourses.map((element) => (
                                <CourseCard key={element._id} data={element} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-2xl text-gray-500">No courses found</p>
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {filteredCourses.length > itemsPerPage && (
                        <div className="flex justify-center items-center space-x-4 mt-8">
                            <button 
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="flex items-center px-4 py-2 bg-teal-100 text-teal-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="mr-2" /> Previous
                            </button>
                            <span className="text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button 
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="flex items-center px-4 py-2 bg-teal-100 text-teal-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next <ChevronRight className="ml-2" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;