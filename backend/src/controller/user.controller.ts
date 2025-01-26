import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export const getUserSearch = async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    console.log(q);

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            bio: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;

    const pageSize = parseInt(req.query.pageSize as string) || 5;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const users = await prisma.user.findMany({
      skip,
      take,
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });

    const totalUsers = await prisma.user.count();
    const totalPages = Math.ceil(totalUsers / pageSize);

    res.status(200).json({
      data: users,
      meta: {
        totalUsers,
        page,
        totalPages,
        pageSize,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const getUserId = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const page = parseInt(req.query.page as string) || 1;

    const pageSize = parseInt(req.query.pageSize as string) || 5;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const userFound = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
        posts: {
          skip,
          take,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            image: true,
          },
        },
      },
    });

    const totalPost = await prisma.post.count({
      where: {
        userId: id,
      },
    });
    const totalPages = Math.ceil(totalPost / pageSize);

    if (!userFound) return res.status(403).json({ message: "User not Found" });

    res.status(200).json({
      data: userFound,
      meta: {
        totalPost,
        page,
        totalPages,
        pageSize,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const updaetUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const { username, email, password, bio } = req.body;

    const userFound = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userFound) return res.status(403).json({ message: "User not Found" });

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userUpdate = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        email,
        password: hashedPassword,
        bio,
      },
    });

    res.status(200).json({
      data: userUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const userDelete = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userDelete) return res.status(403).json({ message: "User not Found" });

    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(204).json({
      message: "User deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const userFollowing = async (req: Request, res: Response) => {
  try {
    const userfollowingID = Number(req.params.id);

    const id = req.userId;

    const user = await prisma.follower.create({
      data: {
        followerId: id,
        followedId: userfollowingID,
      },
    });

    console.log(user);

    res.status(204).json({
      message: "User following",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
};
