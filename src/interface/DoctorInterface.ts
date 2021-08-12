import { Address } from "../entity/Address";
import { User } from "../entity/User";

export interface DoctorCreate {
  name: string;
  cell: string;
  crm: string;
  age: number;
  cpf: string;
  rg: string;
  _address: Address
  healthCenter: User
}

export interface DoctorUpdate {
  name: string;
  cell: string;
  age: number;
  _address: Address
  healthCenter: User
}
