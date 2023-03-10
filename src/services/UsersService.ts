import { prisma } from "../lib/prisma";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthenticateUserInterface {
  name: string;
  username: string;
  password: string;
}

interface LoginUsersInterface {
  username: string;
  password: string;
}

export class UsersService {
  async create({ name, username, password }: AuthenticateUserInterface) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        userName: username,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name: name,
        userName: username,
        password: passwordHash,
      },
    });

    return user;
  }

  async login({ username, password }: LoginUsersInterface) {
    const invalidUserMessage = "User or password incorrect";
    const user = await prisma.user.findUnique({
      where: {
        userName: username,
      },
    });

    if (!user) {
      throw new Error(invalidUserMessage);
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new Error(invalidUserMessage);
    }

    const token = sign({}, __token, {
      subject: user.id,
      expiresIn: "20s",
    });

    return token;
  }
}
