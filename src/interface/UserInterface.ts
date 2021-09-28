import { Address } from "../entity/Address";

export interface UserCreate {
  email: string;
  password: string;
  name: string;
  telephone: string;
  cnpj: string;
  _address: Address
}

export interface UserUpdate {
  email: string;
  password: string;
  name: string;
  telephone: string;
  amountOfVaccinePerDay?: number;
  addressID: Address
}

export interface Login {
  email: string;
  password: string;
}

