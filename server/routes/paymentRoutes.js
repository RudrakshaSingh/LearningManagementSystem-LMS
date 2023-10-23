import { Router } from "express";

import { authorizeRoles, authorizeSubscribers, isLoggedIn } from "../middlewares/auth.middleware.js";
import {
    allPayments,
    buySubscription,
    cancelSubscription,
    getRazorpayApiKey,
    verifySubscription,
} from "../controllers/paymentController.js";

const router = Router();

router.route("/razorpay-key").get(isLoggedIn, getRazorpayApiKey);
router.route("/subscribe").post(isLoggedIn, buySubscription);
router.route("/verify").post(isLoggedIn, verifySubscription);
router.route("/unsubscribe").post(isLoggedIn, authorizeSubscribers, cancelSubscription);
router.route("/").get(isLoggedIn, authorizeRoles("ADMIN"), allPayments);

export default router;
