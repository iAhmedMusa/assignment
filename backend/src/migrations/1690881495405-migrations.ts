import { MigrationInterface, QueryRunner } from 'typeorm';
import { User, UserType } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export class Migrations1690881495405 implements MigrationInterface {
  name = 'Migrations1690881495405';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "sunday_start" character varying, "sunday_end" character varying, "monday_start" character varying, "monday_end" character varying, "tuesday_start" character varying, "tuesday_end" character varying, "wednesday_start" character varying, "wednesday_end" character varying, "thursday_start" character varying, "thursday_end" character varying, "friday_start" character varying, "friday_end" character varying, "saturday_start" character varying, "saturday_end" character varying, "doctorId" integer NOT NULL, CONSTRAINT "REL_337c45461e3d6e6eb3ffa360c9" UNIQUE ("doctorId"), CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "prescription" ("id" SERIAL NOT NULL, "disease" text NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "allergies" boolean NOT NULL DEFAULT false, "diabetes" boolean NOT NULL DEFAULT false, "blood_pressure" boolean NOT NULL DEFAULT false, "smoking_habit" boolean NOT NULL DEFAULT false, "alcohol_consumption" boolean NOT NULL DEFAULT false, "details" text, "tests" text, "reports" text, "doctor_advices" text, "pharmacist_advice" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "pharmacistId" integer, "appointmentId" integer NOT NULL, CONSTRAINT "REL_432108890b812a8a65eb964741" UNIQUE ("appointmentId"), CONSTRAINT "PK_eaba5e4414e5382781e08467b51" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pharmacist" ("id" SERIAL NOT NULL, "title" character varying(128) NOT NULL, "reg_number" character varying NOT NULL, "experience" integer, "bio" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_ad6c8f409fb4362a86b3d3ac50" UNIQUE ("userId"), CONSTRAINT "PK_236fcaf7e1f860652c7db179295" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_type_enum" AS ENUM('admin', 'patient', 'doctor', 'pharmacist')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying, "phone_number" character varying(20), "dob" date, "gender" "public"."user_gender_enum", "city" character varying, "state" character varying, "zip" character varying, "country" character varying, "type" "public"."user_type_enum" NOT NULL DEFAULT 'patient', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."doctor_specialist_enum" AS ENUM('General Physician', 'Pediatrics / Child Care', 'Gynaecology', 'Neurology / Brain', 'Pulmonology / Lungs', 'Nutritionist', 'Gastroenterology', 'Cardiology / Heart', 'Ophthalmology / Eye', 'Dentistry / Dental Care', 'Endocrinology / Diabetes', 'Occupational therapy', 'Nephrology / Kidney', 'Obstetrics', 'ENT / Ear, Nose and Throat', 'Parasitology', 'Podiatry', 'Oncology', 'Dermatology', 'Psychological counsellor', 'Rheumatology', 'Urology', 'Chiropractic')`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctor" ("id" SERIAL NOT NULL, "title" character varying(128) NOT NULL, "reg_number" character varying NOT NULL, "specialist" "public"."doctor_specialist_enum" NOT NULL, "experience" integer, "bio" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_e573a17ab8b6eea2b7fe9905fa" UNIQUE ("userId"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."appointment_status_enum" AS ENUM('accepted', 'rejected', 'pending')`,
    );
    await queryRunner.query(
      `CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "status" "public"."appointment_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "patientId" integer, "doctorId" integer, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_337c45461e3d6e6eb3ffa360c96" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD CONSTRAINT "FK_17e81eb568c21b8179a48da6fc6" FOREIGN KEY ("pharmacistId") REFERENCES "pharmacist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD CONSTRAINT "FK_432108890b812a8a65eb964741e" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pharmacist" ADD CONSTRAINT "FK_ad6c8f409fb4362a86b3d3ac508" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" ADD CONSTRAINT "FK_e573a17ab8b6eea2b7fe9905fa8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        name: '4udoctors Admin',
        phone_number: '01711112222',
        password: await bcrypt.hash('1234567890', 10),
        email: '4udoctors@admin.com',
        type: UserType.Admin,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_5ce4c3130796367c93cd817948e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" DROP CONSTRAINT "FK_e573a17ab8b6eea2b7fe9905fa8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pharmacist" DROP CONSTRAINT "FK_ad6c8f409fb4362a86b3d3ac508"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP CONSTRAINT "FK_432108890b812a8a65eb964741e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP CONSTRAINT "FK_17e81eb568c21b8179a48da6fc6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_337c45461e3d6e6eb3ffa360c96"`,
    );
    await queryRunner.query(`DROP TABLE "appointment"`);
    await queryRunner.query(`DROP TYPE "public"."appointment_status_enum"`);
    await queryRunner.query(`DROP TABLE "doctor"`);
    await queryRunner.query(`DROP TYPE "public"."doctor_specialist_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
    await queryRunner.query(`DROP TABLE "pharmacist"`);
    await queryRunner.query(`DROP TABLE "prescription"`);
    await queryRunner.query(`DROP TABLE "schedule"`);
  }
}
