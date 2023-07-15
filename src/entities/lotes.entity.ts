import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm";
import { Boleto } from "./boletos.entity";
import { IsNotEmpty, Length, IsEmail, IsEnum } from "class-validator";
import { hashSync } from "bcryptjs";

enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@Entity()
export class Lote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 10 })
  @IsEnum(Gender)
  gender: Gender;

  @Column()
  ativo: boolean;

  @Column({ unique: true, length: 60 })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ length: 120 })
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @OneToMany(() => Boleto, (boleto) => boleto.lote)
  boletos: Boleto[];
}
