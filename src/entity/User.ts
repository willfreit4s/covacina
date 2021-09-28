import { IsEmail, Max, Min } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Address } from "./Address";

@Entity()
export class User extends BaseEntity {
 
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  @IsEmail()
  email: string;

  @Column()
  @Min(6)
  @Max(16)
  password: string;

  @Column({ length: 60 })
  @Min(10)
  name: string;

  @Column({ length: 10, unique: true })
  @Min(10)
  @Max(10)
  telephone: string;

  @Column({length: 14, unique: true})
  @Min(14)
  @Max(14)
  cnpj: string;

  @Column({ nullable: true, default: 0 })
  amountOfVaccinePerDay: number;

  @ManyToOne(() => Address)
  addressID: Address;

  @CreateDateColumn()
  created_at: Date;
}
