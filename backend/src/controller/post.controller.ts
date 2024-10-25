import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { File } from "../types";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    const files = req.files as File[];

    const filenames: string[] = files.map(
      (file: File) => `${req.userName}/${file.filename}`
    );

    const id = req.userId;

    const newPost = await prisma.post.create({
      data: {
        content: content,
        userId: id,
        image: filenames,
      },
      select: {
        id: true,
        content: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            reactions: true,
            comments: true,
          },
        },
        comments: {
          orderBy: {createdAt: 'desc'},
          select: {
            id: true, // Si solo quieres contar los comentarios, puedes omitir esto
            content: true,
            createdAt: true,
            userId:true,
            user: {
              select: {
                username: true,
                avatar: true,
              },
            },
          },
        },
        reactions: {
          select: {
            id: true,
            userId: true,
            user:{
              select:{
                username: true,
                avatar: true
              }
            }
          },
        },
      },
    });

    res.status(200).json({
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server internal errors",
    });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;

    const pageSize = parseInt(req.query.pageSize as string) || 5;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const postsFound = await prisma.post.findMany({
      skip: skip,
      take: take,
      orderBy: {createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            reactions: true,
            comments: true,
          },
        },
        comments: {
          skip: 0,
          take: 3,
          orderBy: {createdAt: 'desc'},
          select: {
            id: true,
            content: true,
            createdAt: true,
            userId:true,
            user: {
              select: {
                username: true,
                avatar: true,
              },
            },
          },
        },
        reactions: {
          select: {
            id: true,
            userId: true,
            user:{
              select:{
                username: true,
                avatar: true
              }
            }
          },
        },
      },
    });

    const totalPost = await prisma.post.count();
    const totalPages = Math.ceil(totalPost / pageSize);

    res.status(200).json({
      data: postsFound,
      meta: {
        totalPost,
        page,
        totalPages,
        pageSize,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " Internal Server Error",
    });
  }
};

export const getPostID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;

    const postFound = await prisma.post.findUnique({
      where: {
        id: id as string,
      },
      select: {
        id: true,
        content: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            reactions: true,
            comments: true,
          },
        },
        comments: {
          orderBy: {createdAt: 'desc'},
          select: {
            id: true, // Si solo quieres contar los comentarios, puedes omitir esto
            content: true,
            createdAt: true,
            userId:true,
            user: {
              select: {
                username: true,
                avatar: true,
              },
            },
          },
        },
        reactions: {
          select: {
            id: true,
            userId: true,
            user:{
              select:{
                username: true,
                avatar: true
              }
            }
          },
        },
      },
    });

    if (!postFound) {
      return res.status(403).json({ message: "Post not Found" });
    }

    res.status(200).json({
      data: postFound,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " Internal Server Error",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { content } = req.body;

    const postUpdate = await prisma.post.updateMany({
      where: {
        id,
      },
      data: {
        content,
      },
    });

    if (!postUpdate) return res.status(403).json({ message: "Post not found" });

    res.status(200).json({
      data: postUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " Internal Server Error",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await prisma.comment.deleteMany({
      where: {
        postId: id,
      },
    });
    await prisma.reaction.deleteMany({
      where: {
        postId: id,
      },
    });
    const postFound = await prisma.post.delete({
      where: {
        id,
      },
    });

    if (!postFound)
      return res.status(403).json({
        message: "Post not Fount",
      });

    postFound.image.map((imagen) => {
      const deletePath = path.join("src", "upload", "users", imagen);
      fs.promises.rm(deletePath);
    });

    res.status(204).json({ message: "post Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " Internal Server Error",
    });
  }
};

export const addLike = async (req: Request, res: Response) => {
  try {
    const idPost = req.params.id;

    const idUser = req.userId;

    const reaction = await prisma.reaction.create({
      data: {
        userId: idUser,
        type: "like",
        postId: idPost,
      },
    });

    res.status(200).json({
      idReaction: reaction.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " Internal Server Error",
    });
  }
};

export const deleteLike = async (req: Request, res: Response) => {
  try {
    const idPost = req.params.id;

    const idUser = req.userId;

    await prisma.reaction.deleteMany({
      where: {
        AND: {
          userId: idUser,
          postId: idPost,
        },
      },
    });

    res.status(200).json({ message: "Reaction delete" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " Internal Server Error",
    });
  }
};
