import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIvColumnToMessage1727451687797 implements MigrationInterface {
    name = 'AddIvColumnToMessage1727451687797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ADD "iv" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "iv"`);
    }

}
