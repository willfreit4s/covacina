import { getCustomRepository } from "typeorm";
import { AddressRepository } from "../repositories/AddressRepository";
import { AddressCreate, AddressUpdate } from "../interface/AddressInterface";

class AddressService {
  async create(_address: AddressCreate) {
    const addressRepository = getCustomRepository(AddressRepository);

    try {
     
      //verificar se zipcode existe
      // const userExists = await addressRepository.findOne({
      //   email,
      // });

      // // Se existir, retornar user
      // if (userExists) {
      //   throw new Error("Zipcode already exists!");
      //   //return userExists;
      // }

      //se não existir, salvar no DB
      const address = addressRepository.create({
        ..._address
      });

      await addressRepository.save(address);
      return address;
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

export { AddressService };
