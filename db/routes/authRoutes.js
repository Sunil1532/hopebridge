import express from "express";
import { signup, login, googleLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Add Google login route
router.post("/google-login", googleLogin);

export default router;
