import { Router } from "express";
import {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById,
} from "../controllers/courseController.js";

import { isLoggedIn, authorizedRoles, authorizedSubscriber } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

//for multiple method like router.route("/").get(getAllCourses).post()
router
    .route("/")
    .get(getAllCourses)
    .post(isLoggedIn, authorizedRoles("ADMIN"), upload.single("thumbnail"), createCourse); //multipart form data
router
    .route("/:id")
    .get(isLoggedIn, authorizedSubscriber, getLecturesByCourseId)
    .put(isLoggedIn, authorizedRoles("ADMIN"), updateCourse)
    .delete(isLoggedIn, authorizedRoles("ADMIN"), removeCourse)
    .post(isLoggedIn, authorizedRoles("ADMIN"), upload.single("lecture"), addLectureToCourseById);

export default router;
