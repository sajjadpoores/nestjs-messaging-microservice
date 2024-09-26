import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEntity1727370196885 implements MigrationInterface {
  name = 'UserEntity1727370196885';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL DEFAULT 'user', "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
