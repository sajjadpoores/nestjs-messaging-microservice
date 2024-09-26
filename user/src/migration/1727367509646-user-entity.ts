import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1727367509646 implements MigrationInterface {
    name = 'UserEntity1727367509646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "config" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "value" text NOT NULL, CONSTRAINT "UQ_26489c99ddbb4c91631ef5cc791" UNIQUE ("key"), CONSTRAINT "PK_d0ee79a681413d50b0a4f98cf7b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "config"`);
    }

}
