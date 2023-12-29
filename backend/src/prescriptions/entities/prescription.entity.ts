import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Pharmacist } from 'src/pharmacists/entities/pharmacist.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  disease: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'int', nullable: false })
  weight: number;

  @Column({ type: 'bool', default: false, nullable: false })
  allergies: boolean;

  @Column({ type: 'bool', default: false, nullable: false })
  diabetes: boolean;

  @Column({ type: 'bool', default: false, nullable: false })
  blood_pressure: boolean;

  @Column({ type: 'bool', default: false, nullable: false })
  smoking_habit: boolean;

  @Column({ type: 'bool', default: false, nullable: false })
  alcohol_consumption: boolean;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ type: 'text', nullable: true })
  tests: string;

  @Column({ type: 'text', nullable: true })
  reports: string;

  @Column({ type: 'text', nullable: true })
  doctor_advices: string;

  @Column({ type: 'bool', default: false, nullable: false })
  pharmacist_advice: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // relations

  @ManyToOne(() => Pharmacist, (pharmacist) => pharmacist.prescriptions, {
    nullable: true,
  })
  pharmacist: Pharmacist;

  @OneToOne(() => Appointment, (appointment) => appointment.prescription, {
    nullable: false,
  })
  @JoinColumn()
  appointment: Appointment;
}
