import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrations1689383611298 implements MigrationInterface {
    name = 'InitialMigrations1689383611298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lote" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "gender" character varying(10) NOT NULL, "ativo" boolean NOT NULL, "email" character varying(60) NOT NULL, "password" character varying(120) NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_df510f1c5d3e1a2da6c99fc8f1a" UNIQUE ("email"), CONSTRAINT "PK_db72652dca29e9e818c3c10abed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boleto" ("id" SERIAL NOT NULL, "nome_sacado" character varying(255) NOT NULL, "id_lote" integer NOT NULL, "valor" numeric(10,2) NOT NULL, "linha_digitavel" character varying(255) NOT NULL, "ativo" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "loteId" integer, CONSTRAINT "PK_b95cb77c026b2963089f016b91b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "boleto" ADD CONSTRAINT "FK_307b4ecba63f38ec56988c503f6" FOREIGN KEY ("loteId") REFERENCES "lote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boleto" DROP CONSTRAINT "FK_307b4ecba63f38ec56988c503f6"`);
        await queryRunner.query(`DROP TABLE "boleto"`);
        await queryRunner.query(`DROP TABLE "lote"`);
    }

}
