import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseColumns1727444916981 implements MigrationInterface {
  name = 'BaseColumns1727444916981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "active" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
  }
}
