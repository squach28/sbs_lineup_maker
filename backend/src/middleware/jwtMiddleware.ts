import express from "express";

import { TokenDetails } from "../types/TokenDetails";
import { verifyAccessToken } from "../utils/jwt";

interface RequestWithToken extends express.Request {
  user: TokenDetails;
}

export const jwtMiddleware = async (
  req: RequestWithToken,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (accessToken === undefined) {
      res.status(401).json({ message: "Token is missing in request" });
      return;
    }

    const user = verifyAccessToken(accessToken);

    req.user = user as TokenDetails;
    next();
  } catch (e) {
    res.status(401).json({ message: "Token is invalid" });
    return;
  }
};
