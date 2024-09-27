import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1727443867455 implements MigrationInterface {
    name = 'Entities1727443867455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone, "deletedAt" TIMESTAMP, "active" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone, "deletedAt" TIMESTAMP, "active" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "sender" integer NOT NULL, "receiver" integer NOT NULL, "text" character varying, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message_file" ("messageId" integer NOT NULL, "fileId" integer NOT NULL, CONSTRAINT "PK_0c1c7ad1a09f386468adf0d4d6a" PRIMARY KEY ("messageId", "fileId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a8871620617c6dbe660d0fe399" ON "message_file" ("messageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_15b2d36767930d7033ce540ea5" ON "message_file" ("fileId") `);
        await queryRunner.query(`ALTER TABLE "message_file" ADD CONSTRAINT "FK_a8871620617c6dbe660d0fe399c" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "message_file" ADD CONSTRAINT "FK_15b2d36767930d7033ce540ea51" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message_file" DROP CONSTRAINT "FK_15b2d36767930d7033ce540ea51"`);
        await queryRunner.query(`ALTER TABLE "message_file" DROP CONSTRAINT "FK_a8871620617c6dbe660d0fe399c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_15b2d36767930d7033ce540ea5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a8871620617c6dbe660d0fe399"`);
        await queryRunner.query(`DROP TABLE "message_file"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
