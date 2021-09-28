import { Address } from "../entity/Address";

export class UserModel  {
  user: string;
  password: string;
  name: string;
  telephone: string;
  cnpj: string;
  amountOfVaccinePerDay: number;
  addressID: Address
}

export class UserUpdate {
  user: string;
  password: string;
  name: string;
  telephone: string;
  amountOfVaccinePerDay: number;
  addressID: Address
}

export class Login {
  user: string;
  password: string;
}
