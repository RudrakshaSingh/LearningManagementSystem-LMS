import { Router } from "express";

const router = Router();

router.route("/").get(getAllCourses);
router.get("/:id", getLecturesByCourseId);

export default router;
