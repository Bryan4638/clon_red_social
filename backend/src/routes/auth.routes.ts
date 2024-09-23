import { Router } from "express";
import {
  register,
  login,
  logout,
  confirmEmail,
  verifyToken
} from "../controller/auth.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { loginSchema, registerSchema } from "../Schema/auth.schema";
const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.get("/confirm/:token", confirmEmail);

router.get("/verify", verifyToken);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);


export default router;
