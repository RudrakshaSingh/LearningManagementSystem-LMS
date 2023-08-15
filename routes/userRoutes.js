import { Router } from "express";
import {
    getProfile,
    login,
    logout,
    register,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router.post("/register", upload.single("avatar"), register); //single file upload
router.post("/login", login);
router.get("/logout", logout); //url pe directly from brwoser we can logout
router.post("/me", isLoggedIn, getProfile);

export default router;
