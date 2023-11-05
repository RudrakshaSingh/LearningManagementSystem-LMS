import { Router } from "express";
import {
    addLectureToCourseById,
    createCourse,
    deleteCourseById,
    getAllCourses,
    getLecturesByCourseId,
    removeLectureFromCourse,
    updateCourseById,
} from "../controllers/courseController.js";

import { isLoggedIn, authorizedRoles, authorizedSubscriber } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

//for multiple method like router.route("/").get(getAllCourses).post()
router
    .route("/")
    .get(getAllCourses)
    .post(isLoggedIn, authorizedRoles("ADMIN"), upload.single("thumbnail"), createCourse)
    .delete(isLoggedIn, authorizedRoles("ADMIN"), removeLectureFromCourse);

router
    .route("/:id")
    .get(isLoggedIn, authorizedSubscriber, getLecturesByCourseId) // Added authorizeSubscribers to check if user is admin or subscribed if not then forbid the access to the lectures
    .post(isLoggedIn, authorizedRoles("ADMIN"), upload.single("lecture"), addLectureToCourseById)
    .put(isLoggedIn, authorizedRoles("ADMIN"), updateCourseById)
    .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteCourseById);

export default router;
