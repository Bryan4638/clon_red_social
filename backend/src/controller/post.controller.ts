import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {SERVER_URL} from '../conf'

const prisma = new PrismaClient();


export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    
    const imagePath = `${SERVER_URL}/public/users/${req.userName}/${req.file?.filename}` 

    const id = req.userId

    const newPost = await prisma.post.create({
      data: {
        content: content,
        userId: id,
        image: imagePath
      },
    });

    res.status(200).json({
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server internal errors",
    });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;

    const pageSize = parseInt(req.query.pageSize as string) || 5 ;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const postsFound = await prisma.post.findMany({
      skip: skip,
      take: take,
      include: {
        user: {
          select: {
            username: true,
            avatar: true
          }
        }
      }
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
    const id =  req.params.id
    const postFound = await prisma.post.deleteMany({
      where:{
        id
      }
    })

    if (!postFound) return res.status(403).json({
      message: "Post not Fount"
    })

    res.status(204).json({message: "post Deleted"})

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " Internal Server Error",
    });
  }
};
