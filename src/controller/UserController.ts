import { Response } from "express";
import { User } from "../entity/User";
import { UserService } from "../services/UsersService";
import { ExampleBaseRequest } from "../utils/ExampleBaseRequest";

export class UserController {
  async all() {
    const users = await User.find({relations: ["addressID"]});
    return users;
  }

  async login({ email, password }) {
    const usersService = new UserService();
    try {
      const user = await usersService.login({
        email,
        password,
      });

      return user;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  //   // retorno é uma promise de response. Criando User
  async create(
    { email, password, name, telephone, _address },
    res: Response
  ): Promise<Response> {
    const usersService = new UserService();

    try {
      const user = await usersService.create({
        email,
        password,
        name,
        telephone,
        _address,
      });

      return user;
    } catch (e) {
      return res.status(400).json({
        message: e.message,
      });
    }

    //   async update(req: ExampleBaseRequest, res: Response): Promise<Response> {
    //     const { name, password } = req.body;
    //     const id: string = req.params.id;
    //     const usersService = new UserService();

    //     try {
    //       const user = await usersService.update(id, {
    //         name,
    //         password,
    //       });

    //       return res.status(200).json({
    //         message: "user edited",
    //         data: user,
    //       });
    //     } catch (e) {
    //       return res.status(400).json({
    //         message: e.message,
    //       });
    //     }
    //   }

    //   async delete(req: ExampleBaseRequest, res: Response): Promise<Response> {
    //     const id: string = req.params.id;
    //     const usersService = new UserService();

    //     try {
    //       const user = await usersService.delete(id);

    //       return res.json({
    //         message: user.message,
    //         status: user.status,
    //       });
    //     } catch (e) {
    //       return res.status(400).json({
    //         message: e.message,
    //       });
    //     }
    //   }
  }
}
