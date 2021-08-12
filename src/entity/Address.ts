import { Max, Min } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 30 })
  @Min(4)
  @Max(30)
  street: string;

  @Column({unique: true})
  number: string;

  @Column({ length: 20 })
  @Min(4)
  @Max(20)
  district: string;

  @Column()
  @Min(8)
  @Max(8)
  zipCode: number;

  @Column({ length: 2 })
  @Min(2)
  @Max(2)
  uf: string;

  @CreateDateColumn()
  created_at: Date;
}
