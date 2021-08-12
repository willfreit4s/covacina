import { getCustomRepository } from "typeorm";
import { DoctorRepository } from "../repositories/DoctorRepository";
import { DoctorCreate, DoctorUpdate } from "../interface/DoctorInterface";
import { AddressService } from "./AddressService";
import { Response } from "express";

class DoctorService {
  async create(
    { name, cell, crm, age, cpf, rg, _address }: DoctorCreate,
    loggedUser: object,
    res: Response
  ) {
    const doctorRepository = getCustomRepository(DoctorRepository);
    const addressService = new AddressService();

    try {
      const address = await addressService.create(_address);

      const doctorExists = await doctorRepository.findOne({
        crm,
      });

      if (doctorExists) {
        return res.status(400).json({
          message: "Doctor already exists!",
        });
        // throw new Error("Doctor already exists!");
      }

      const doctor = doctorRepository.create({
        name,
        cell,
        crm,
        age,
        cpf,
        rg,
        address: address,
        healthCenter: loggedUser,
      });

      await doctorRepository.save(doctor);
      return doctor;
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

export { DoctorService };
