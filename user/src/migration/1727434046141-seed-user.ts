import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUser1727434046141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "public"."user" ("username", "password", "name", "role") VALUES ('admin', 'test', 'admin user', 'admin');`,
    );

    await queryRunner.query(
      `INSERT INTO "public"."user" ("username", "password", "name", "role") VALUES ('user', 'test', 'normal user', 'user');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "public"."user" WHERE "username" in ('admin', 'user')`,
    );
  }
}
