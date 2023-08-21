import { Router } from "express";
import {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
} from "../controllers/courseController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

//for multiple method like router.route("/").get(getAllCourses).post()
router
    .route("/")
    .get(getAllCourses)
    .post(isLoggedIn, upload.single("thumbnail"), createCourse); //multipart form data
router
    .route("/:id")
    .get(isLoggedIn, getLecturesByCourseId)
    .put(isLoggedIn, updateCourse)
    .delete(isLoggedIn, removeCourse);

export default router;
