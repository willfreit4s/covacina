import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
import { UserCreate, UserUpdate, Login } from "../interface/UserInterface";
import { AddressService } from "./AddressService";

class UserService {
  async login({ email, password }: Login) {
    const usersRepository = getCustomRepository(UsersRepository);

    try {
      const user = await usersRepository.findOne({ where: { email } });
      if (!user) throw new Error("User Not Found!");
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) throw new Error("Password Incorrect");

      const token = jwt.sign({ userId: user.id }, "MySecretKey", {
        expiresIn: "1d",
      });

      return { user, token, status: 200 };
    } catch (e) {
      return e.message;
    }
  }

  async create({ email, password, name, telephone, cnpj, _address }: UserCreate) {
    const usersRepository = getCustomRepository(UsersRepository);
    const addressService = new AddressService();
    try {
      const address = await addressService.create(_address);

      const userExists = await usersRepository.findOne({
        email,
      });

      if (userExists) {
        throw new Error("Health center already exists!");      
      }
      
      const user = usersRepository.create({
        email,
        password,
        name,
        telephone,
        cnpj,
        addressID: address,
      });

      user.password = await bcrypt.hash(password, 12);

      await usersRepository.save(user);
      return user;
    } catch (e) {
      return e.message;
    }
  }

  //   // verificar o id do usuário logado se existe na base de dados
  //   async update(id: string, { name, password}: UserUpdate) {
  //     const usersRepository = getCustomRepository(UsersRepository);
  //     try {
  //       const userExists = await usersRepository.findOne({
  //         id, // id da pessoa logada (passar o loggedUser)
  //       });

  //       if (!userExists) {
  //         throw new Error("User don't already exists!");
  //       }

  //       userExists.name = name;

  //       if (userExists.password !== undefined)
  //         userExists.password = await bcrypt.hash(password, 12);

  //       await usersRepository.save(userExists);

  //       return userExists;
  //     } catch (e) {
  //       return e.message;
  //     }
  //   }

  //   // verificar o id do usuário logado se existe na base de dados
  //   async delete(id: string) {
  //     const usersRepository = getCustomRepository(UsersRepository);

  //     try {
  //       const userExists = await usersRepository.findOne({
  //         id, // verificar se o id existe (passar o loggedUser)
  //       });

  //       if (!userExists) {
  //         throw new Error("User not found!");
  //       }

  //       await userExists.remove();
  //       return { status: 200, message: "User Deleted" };
  //     } catch (e) {
  //       return e.message;
  //     }
  //   }
}

export { UserService };
