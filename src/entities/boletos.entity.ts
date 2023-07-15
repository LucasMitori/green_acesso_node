import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Lote } from "./lotes.entity";

@Entity()
export class Boleto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome_sacado: string;

  @ManyToOne(() => Lote, (lote) => lote.boletos)
  lote: Lote;

  @Column({ name: "id_lote" })
  id_lote: number;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;

  @Column({ length: 255 })
  linha_digitavel: string;

  @Column()
  ativo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
