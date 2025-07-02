import express from "express";
import { createAdmin,
        loginAdmin,
        logoutAdmin,
        sendOtp,
        updatePassword,
        verifyOtp
 } from "../controllers/adminController.js";

const router = express.Router();

router.route('/register').post(createAdmin);
router.route('/login').post(loginAdmin);
router.route('/logout').post(logoutAdmin);
router.route('/send-otp').post(sendOtp);
router.route('/verify-otp').post(verifyOtp);
router.route('/updatepassword').post(updatePassword)

export default router;