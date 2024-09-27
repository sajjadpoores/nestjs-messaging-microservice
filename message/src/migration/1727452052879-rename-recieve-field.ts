import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameRecieveField1727452052879 implements MigrationInterface {
    name = 'RenameRecieveField1727452052879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" RENAME COLUMN "receiver" TO "reciever"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" RENAME COLUMN "reciever" TO "receiver"`);
    }

}
