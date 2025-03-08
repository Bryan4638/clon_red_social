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
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/images"); // Carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

// Configuración del middleware Multer
const upload = multer({ storage: storage });

const router = Router();

router.get("/users", authMiddleware, getUsers);

router.get("/users/search", authMiddleware, getUserSearch);

router.get("/user/:id", authMiddleware, getUserId);

router.put("/user/:id", authMiddleware, upload.single("image"), updaetUser);

router.delete("/user/:id", authMiddleware, deleteUser);

router.post("/user/follow/:id", authMiddleware, userFollowing);

router.post("/user/unfollow/:id", authMiddleware, userUnfollow);

export default router;
