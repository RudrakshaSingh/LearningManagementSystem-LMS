import { Router } from "express";

import { authorizedRoles, authorizedSubscriber, isLoggedIn } from "../middlewares/authMiddleware.js";
import {
    allPaymentsOfCurrentYear,
    buySubscription,
    cancelSubscription,
    getRazorpayApiKey,
    verifySubscription,
} from "../controllers/paymentController.js";

const router = Router();

router.route("/razorpay-key").get(isLoggedIn, getRazorpayApiKey);
router.route("/subscribe").post(isLoggedIn, buySubscription);
router.route("/verify").post(isLoggedIn, verifySubscription);
router.route("/unsubscribe").post(isLoggedIn, authorizedSubscriber, cancelSubscription);
router.route("/").get(isLoggedIn, authorizedRoles("ADMIN"), allPaymentsOfCurrentYear);

export default router;
