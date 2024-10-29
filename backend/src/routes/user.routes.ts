import { Router } from "express";
import { authMiddleware } from "../middlewares/middlewares";
import {deleteUser, getUserId, getUsers, updaetUser, userFollowing} from '../controller/user.controller'

const router = Router();

router.get("/users", authMiddleware, getUsers)

router.get("/user/:id", authMiddleware, getUserId)

router.put("/user/:id", authMiddleware, updaetUser)

router.delete("/user/:id", authMiddleware, deleteUser)

router.post("/user/follow/:id", authMiddleware, userFollowing)



export default router;
