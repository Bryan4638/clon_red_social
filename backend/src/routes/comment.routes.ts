import { Router } from "express";
import { authMiddleware } from "../middlewares/middlewares";
import { createComments } from "../controller/comments.controller";

const router = Router();

router.post("/post/:id/comment", authMiddleware, createComments);

router.put("/post/:idPots/commnet/:idCommnet", authMiddleware);

router.delete("/post/:idPots/commnet/:idCommnet", authMiddleware);

export default router;
