import express from "express";

export const login = (req: express.Request, res: express.Response) => {};

export const signup = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
  } catch (e) {
    console.log(e);
  }
};

export const logout = (req: express.Request, res: express.Response) => {};
