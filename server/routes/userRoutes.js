import { Router } from "express";
import {
    getProfile,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router.post("/register", upload.single("avatar"), register); //single file upload
router.post("/login", login);
router.post("/logout", logout); //url pe directly from brwoser we can logout
router.get("/me", isLoggedIn, getProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);
router.put("/update/:id", isLoggedIn, upload.single("avatar"), updateUser);

export default router;
