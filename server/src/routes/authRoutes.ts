// import { getUsers } from './../modules/trip/tripController';
import { Router } from "express";
import {
  login,
  register,
  addUser,
  updateUser,
  deleteUser,
  getUsers,
  getAuthenticatedUser
} from "../modules/auth/userController";
import { authValidation } from "../validators";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/login", authValidation.loginValidator, login);
router.post("/register", authValidation.registerValidator, register);
router.get('/me', authMiddleware, getAuthenticatedUser);



// User CRUD routes
router.get("/users", getUsers); // List users with pagination & search
router.post("/users", addUser); // Add new user
router.put("/users/:id", updateUser); // Update user by ID
router.delete("/users/:id", deleteUser);

export default router;
