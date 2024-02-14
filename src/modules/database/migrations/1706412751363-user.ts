import { schema } from "@app/modules/configs/env";
import { MigrationInterface, QueryRunner } from "typeorm";

export class User1706412751363 implements MigrationInterface {
    name = 'User1706412751363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "${schema}"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "${schema}"."user"`);
    }

}
