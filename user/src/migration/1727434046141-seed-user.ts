import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUser1727434046141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "public"."user" ("username", "password", "name", "role") VALUES ('admin', '$2a$12$pcEUF6IfPwdNEyU8ZH.KduEHAb0s.K.tCG3Mhou35nexXNcTYinO6', 'admin user', 'admin');`,
    );

    await queryRunner.query(
      `INSERT INTO "public"."user" ("username", "password", "name", "role") VALUES ('user', '$2a$12$pcEUF6IfPwdNEyU8ZH.KduEHAb0s.K.tCG3Mhou35nexXNcTYinO6', 'normal user', 'user');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "public"."user" WHERE "username" in ('admin', 'user')`,
    );
  }
}
