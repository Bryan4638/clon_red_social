import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export const createComments = async (req: Request, res: Response) => {
  try {
    const idPost = req.params.id

    const userId = req.userId

    const {content} = req.body

    const newComment = await prisma.comment.create({
      data: {
        content,
        userId,
        postId: idPost
      },
      select: {
        id: true, 
        content: true,
        createdAt: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    })

    res.status(200).json(newComment)

  } catch (error) {
    res.status(500).json({
      message: "Server internal errors",
    });
  }
};
