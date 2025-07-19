import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes"

const router = Router();

// Versioned routing prefix is added in app.ts using env.BASIC_API_URL
router.use("/auth", authRoutes)
router.use("/user", userRoutes)



export default router;