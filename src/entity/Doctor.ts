import { IsInt, Max, Min } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Address } from "./Address";
import { User } from "./User";

@Entity()
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  @Min(10)
  @Max(60)
  name: string;

  @Column({ length: 11, unique: true })
  @Min(11)
  @Max(11)
  cell: string;

  @Column({ length: 7, unique: true })
  @Min(7)
  @Max(7)
  crm: string;

  @Column()
  @IsInt()
  age: number;

  @Column({ length: 11, unique: true })
  @Min(11)
  @Max(11)
  cpf: string;

  @Column({ length: 9, unique: true })
  @Min(9)
  @Max(9)
  rg: string;

  @ManyToOne(() => Address)
  address: Address;

  @ManyToOne(() => User)
  healthCenter: User;

  @CreateDateColumn()
  created_at: Date;
}
