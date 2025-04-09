import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenDetails } from "../types/TokenDetails";

dotenv.config();

export const generateAccessToken = (tokenDetails: TokenDetails) => {
  return jwt.sign(tokenDetails, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};

export const generateRefreshToken = (tokenDetails: TokenDetails) => {
  return jwt.sign(tokenDetails, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "30 days",
  });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET as string
  ) as JwtPayload;
};
