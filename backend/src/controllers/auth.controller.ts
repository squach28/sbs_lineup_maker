import express from "express";
import bccrypt from "bcrypt";
import { authQueries } from "../db/queries/auth";
import { db } from "../db/db";

export const login = (req: express.Request, res: express.Response) => {};

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
      res.status(400).json({ message: "User with email already exists" });
      return;
    }

    const passwordHash = await bccrypt.hash(
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

    res.status(201).json("hello");
    return;
  } catch (e) {
    console.log(e);
    await client.query("ROLLBACK");
    res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  } finally {
    client.release();
  }
};

export const logout = (req: express.Request, res: express.Response) => {};
