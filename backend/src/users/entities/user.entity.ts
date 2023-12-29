import { Appointment } from 'src/appointments/entities/appointment.entity';
import GenderType from 'src/constants/gender-type.enum';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Pharmacist } from 'src/pharmacists/entities/pharmacist.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserType {
  Admin = 'admin',
  Patient = 'patient',
  Doctor = 'doctor',
  Pharmacist = 'pharmacist',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
    select: false,
  })
  password: string;

  @Column({
    length: 20,
    nullable: true,
  })
  phone_number: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'enum', nullable: true, enum: GenderType })
  gender: GenderType;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  city: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  state: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  zip: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  country: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.Patient,
    nullable: false,
  })
  type: UserType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // relationships
  @OneToOne(() => Doctor, (doctor) => doctor.user)
  doctor: Doctor;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToOne(() => Pharmacist, (pharmacist) => pharmacist.user)
  pharmacist: Pharmacist;

  @OneToMany(() => Prescription, (prescription) => prescription.pharmacist)
  prescriptions: Prescription[];
}
