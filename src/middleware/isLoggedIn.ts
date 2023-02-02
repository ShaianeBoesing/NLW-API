import * as express from "express";
import { verify } from "jsonwebtoken";

type Next = () => void | Promise<void>;

export function isLoggedIn(
  req: express.Request,
  res: express.Response,
  next: Next
) {
  const loginToken = req.headers.authorization;

  if (!loginToken) {
    res.json({ message: "Token is missing" }).status(401);
  }

  const [, token] = loginToken?.split(" ") || "";

  try {
    verify(token, __token);
  } catch (e) {
    res.json({ message: "Invalid Token" }).status(401);
  }

  next();
}
