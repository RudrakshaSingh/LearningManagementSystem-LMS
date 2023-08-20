import Course from "../models/courseModel";
//you should use try catch everywhere you see await or any exception that can come
const getAllCourses = async function (req, res, next) {
    const courses = await Course.find({}).select("-lectures");
    res.status(200).json({
        success: true,
        message: "all courses",
        courses,
    });
};

const getLecturesByCourseId = async function (req, res, next) {};

export { getAllCourses, getLecturesByCourseId };
