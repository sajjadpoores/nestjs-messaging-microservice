import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1727713405191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "public"."message" ("createdAt", "updatedAt", "deletedAt", "active", "id", "sender", "receiver", "text", "iv") VALUES ('2024-09-28 15:56:15', '2024-09-28 15:56:15', NULL, 'f', 1, 1, 2, 'a6f5da5ea8a6fb1044d58221e0f61ab9', 'a19897f336ae14461d9d94c42e356243');
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "public"."message" Where id = 1`);
  }
}
