import { TokenVerify } from "./JwtMiddleware";
import { Response, NextFunction } from "express";
import { ExampleBaseRequest } from "../utils/ExampleBaseRequest";
import { UsersRepository } from "../repositories/UsersRepository";
import { getCustomRepository } from "typeorm";

export async function AuthMiddleware(
  req: ExampleBaseRequest,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { headers } = req;
  const bearer = headers.authorization;
  let requesterCredential: string;
  let payload: any;

  if (bearer) {
    try {
      requesterCredential = bearer.split(" ")[1];
      payload = TokenVerify(requesterCredential);
      const usersRepository = getCustomRepository(UsersRepository);
      const loggedUser = await usersRepository.findOne({
        where: { id: payload.userId },
      });
      req.user = loggedUser;
      next();
    } catch (error) {
      return res.status(400).json(error.message);
    }
  } else {
    return res.status(401).json("Unauthorized");
  }
}
