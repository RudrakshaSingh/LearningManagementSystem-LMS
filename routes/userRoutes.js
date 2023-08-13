import { Router } from "express";
import {
    getProfile,
    login,
    logout,
    register,
} from "../controllers/userController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout); //url pe directly from brwoser we can logout
router.post("/me", getProfile);

export default router;
