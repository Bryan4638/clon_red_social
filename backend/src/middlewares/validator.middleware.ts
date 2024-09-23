import {Response, Request, NextFunction} from 'express'
import { loginSchema, registerSchema } from "../Schema/auth.schema";

export const validateSchema = (schema: typeof loginSchema | typeof registerSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error: any) {
    return res
      .status(400)
      .json(error.errors.map((error: any) => error.message));
  }
};
