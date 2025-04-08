import express from "express";
import bcrypt from "bcrypt";
import { authQueries } from "../db/queries/auth";
import { db } from "../db/db";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const user = await db.query(authQueries.getCredentialsByEmail, [email]);

    if (user.rowCount === null || user.rowCount === 0) {
      res.status(404).json({ message: "User with that email doesn't exist" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Password is incorrect" });
      return;
    }
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
      res.status(400).json({ message: "User with email already exists" });
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
  } finally {
    client.release();
  }
};

export const logout = (req: express.Request, res: express.Response) => {};
