import express from "express";
import {
  checkAuth,
  login,
  logout,
  refreshToken,
  signup,
} from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/logout", logout);

authRouter.get("/me", checkAuth);
authRouter.post("/refresh", refreshToken);
