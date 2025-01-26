import multer from "multer";
import path from "path";
import fs from 'fs';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const userFound = await prisma.user.findUnique({
        where: {
          id: req.userId,
        },
      });

      if (!userFound) {
        return cb(new Error('User ID is missing in the request'), "");
      }

      req.userName = userFound.username

      const uploadPath = path.join(
        "src",
        "upload",
        "users",
        userFound.username
      );

      await fs.promises.mkdir(uploadPath, { recursive: true });

      cb(null, uploadPath);
    } catch (error) {
      console.log(error);
      cb(error as Error, "")
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const upload = multer({ storage });
