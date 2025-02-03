import { Router } from "express";
import { authMiddleware } from "../middlewares/middlewares";
import {
  deleteUser,
  getUserId,
  getUsers,
  getUserSearch,
  updaetUser,
  userFollowing,
  userUnfollow,
} from "../controller/user.controller";

const router = Router();

router.get("/users", authMiddleware, getUsers);

router.get("/users/search", authMiddleware, getUserSearch);

router.get("/user/:id", authMiddleware, getUserId);

router.put("/user/:id", authMiddleware, updaetUser);

router.delete("/user/:id", authMiddleware, deleteUser);

router.post("/user/follow/:id", authMiddleware, userFollowing);

router.post("/user/unfollow/:id", authMiddleware, userUnfollow);

export default router;
