import express from "express";
import morgan from "morgan";

import login from "./routes/auth.routes";
import post from './routes/post.routes'
import user from './routes/user.routes'
import comment from './routes/comment.routes'
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const port = 4000;

app.use(
  cors({
    origin: ["http://localhost:4173", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", login);
app.use("/api", post)
app.use("/api", user)
app.use("/api", comment)

app.use(
  "/public",
  express.static(path.join(__dirname, "/upload"))
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
