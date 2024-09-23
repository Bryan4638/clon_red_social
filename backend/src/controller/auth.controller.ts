import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { createToken } from "../libs/jwt";
import { TOKEN_SECRET } from "../conf";
import jwt from "jsonwebtoken";
import {TokenPayload} from '../types'
import { sendEmail } from "../libs/mail.conf";

const prisma = new PrismaClient();


export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    const emailfind = await prisma.user.findFirst({ where: { email } });
    const userfind = await prisma.user.findFirst({ where: { username } });

    if (emailfind || userfind) {
      return res.status(500).json(["Email o Username en uso"]);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        status: false,
      },
    });

    const token = await createToken(String(newUser.id));

    //await sendEmail(email, username, token);

    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });

    res.json({
      usermane: newUser.username,
      email: newUser.email,
      id: newUser.id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json("Server Error");
  }
};

export const confirmEmail = async (req: Request, res: Response) => {
  try {
    // Obtener el token de la URL
    const { token } = req.params;

    // Verificar la data
    if (!token) {
      return res.status(401).json({ message: "Usuario no validado" });
    }

    const decode = jwt.verify(token, TOKEN_SECRET) as TokenPayload;

    // Verificar existencia del usuario
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(decode.id),
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }
    // Actualizar usuario
    await prisma.user.update({
      where: {
        id: parseInt(decode.id),
      },
      data: {
        status: true,
      },
    });

    // Enviar el token al navegador
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    return res.json({
      message: "Usuario Verificado ",
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("Error de JWT", error);
      return res.status(401).json({ message: "Token is not valid" });
    } else {
      console.error("Error interno del servidor ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return res.status(401).json(["Usuario no encontrado"]);
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json(["Contraseña incorrecta"]);
    }

    const token = await createToken(String(user.id));

    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });
    res.json({
      username: user.username,
      email: user.email,
      status: user.status,
      id: user.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error del servidor");
  }
};


export const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  const decode = jwt.verify(token, TOKEN_SECRET) as TokenPayload;
  if (!decode) return res.status(401);

  const userFound = await prisma.user.findUnique({
    where: { id: parseInt(decode.id) },
  });
  
  if (!userFound) return res.status(401).json({message: "User Not found"});

  return res.json({
    username: userFound.username,
    email: userFound.email,
  });
};

export const logout = (_req: Request, res: Response) => {

  res.cookie("token", "", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });
  return res.status(200);
};
