import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostID,
  getPosts,
  updatePost,
} from "../controller/post.controller";
import {upload} from '../libs/multer'
import { authMiddleware } from "../middlewares/middlewares";

const router = Router();


router.post("/post", authMiddleware, upload.single("image"), createPost);

router.get("/posts/", authMiddleware, getPosts);

router.get("/post/", authMiddleware, getPostID);

router.put("/post/:id", authMiddleware, updatePost);

router.delete("/post/:id", authMiddleware, deletePost);

export default router;
