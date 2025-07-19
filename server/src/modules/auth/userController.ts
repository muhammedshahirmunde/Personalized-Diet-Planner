import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  addUserService,
  updateUserService,
  getUsersService,
  deleteUserService,
  getUserById,
} from "./userService";
 
export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await getUsersService(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
 
export const register = async (req: Request, res: Response) => {
  try {
    const { user, token } = await registerUser(req.body);
     res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400000,
    });
 
    res.status(200).json({ user });
  } catch (error: any) {
    console.log("Error while registering :", error);
    res.status(400).json({ message: error.message });
  }
};
 
export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await loginUser(req.body);
 
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400000,
    });
 
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
 
export const getAuthenticatedUser = async (req: Request, res: Response) => {
  try {
 
   
const userId = (req as any).userId;
 
  // Now you can use userId to fetch user data
//   const user = await User.findById(userId);
 
    const user = await getUserById(userId);
    res.json({ user });
  } catch {
    res.status(404).json({ message: "User not found" });
  }
};
 
export const addUser = async (req: Request, res: Response) => {
  try {
    const user = await addUserService(req.body);
    res.status(201).json({ message: "User added successfully", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
 
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await updateUserService(req.params.id, req.body);
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
 
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await deleteUserService(req.params.id);
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};