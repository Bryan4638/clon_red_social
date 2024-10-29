import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { TOKEN_SECRET } from "../conf";
import { TokenPayload } from "../types";


const prisma = new PrismaClient();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    jwt.verify(
      token,
      TOKEN_SECRET,
      async (
        err: VerifyErrors | null,
        decoded: JwtPayload | string | undefined
      ) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ message: "Token is not valid" });
        }
        req.userId = parseInt((decoded as TokenPayload).id)
        next();
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
