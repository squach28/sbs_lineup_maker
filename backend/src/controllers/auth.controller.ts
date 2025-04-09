import express from "express";
import bcrypt from "bcrypt";
import { authQueries } from "../db/queries/auth";
import { db } from "../db/db";
import { TokenDetails } from "../types/TokenDetails";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const result = await db.query(authQueries.getCredentialsByEmail, [email]);

    if (result.rowCount === null || result.rowCount === 0) {
      res.status(404).json({ message: "User with that email doesn't exist" });
      return;
    }

    const user = result.rows[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Password is incorrect" });
      return;
    }

    const tokenDetails: TokenDetails = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
    };
    const accessToken = generateAccessToken(tokenDetails);
    const refreshToken = generateRefreshToken(tokenDetails);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    res.status(200).json({ message: "Success" });
    return;
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
    return;
  }
};

export const signup = async (req: express.Request, res: express.Response) => {
  const client = await db.connect();
  try {
    const { email, firstName, lastName, password } = req.body;
    if (
      email === undefined ||
      password === undefined ||
      firstName === undefined ||
      lastName === undefined
    ) {
      res.status(400).json({
        message: "Email, first name, last name, and password are required",
      });
      return;
    }

    const existingUser = await db.query(authQueries.getUserByEmail, [email]);

    if (existingUser.rowCount === null || existingUser.rowCount > 0) {
      res
        .status(400)
        .json({ name: "email", message: "User with email already exists" });
      return;
    }

    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    await client.query("BEGIN");

    await db.query(authQueries.insertUser, [
      email,
      firstName,
      lastName,
      passwordHash,
    ]);

    await client.query("COMMIT");

    res.status(201).json({ message: "Account was successfully created" });
    return;
  } catch (e) {
    console.log(e);
    await client.query("ROLLBACK");
    res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
    return;
  } finally {
    client.release();
  }
};

export const logout = (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(204).send();
    return;
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
    return;
  }
};
