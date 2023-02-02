import * as express from "express";
import { z } from "zod";
import { UsersService } from "../services/UsersService";

export class UsersController {
  async create(req: express.Request, res: express.Response) {
    const getUserAuthenticationParams = z.object({
      username: z.string(),
      name: z.string(),
      password: z.string(),
    });

    const { username, name, password } = getUserAuthenticationParams.parse(
      req.body
    );

    const userService = new UsersService();

    const user = await userService.create({
      username,
      name,
      password,
    });

    res.send(200);
  }

  async login(req: express.Request, res: express.Response) {
    const userLoginParams = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = userLoginParams.parse(req.body);

    const userService = new UsersService();

    const token = await userService.login({ username, password });

    res.json({ token: token }).status(200);
  }
}
