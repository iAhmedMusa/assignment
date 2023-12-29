import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { User } from 'src/users/entities/user.entity';
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

export enum AppointmentStatus {
  Accepted = 'accepted',
  Rejected = 'rejected',
  Pending = 'pending',
}
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    default: AppointmentStatus.Pending,
    enum: AppointmentStatus,
  })
  status: AppointmentStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // relations

  @ManyToOne(() => User, (user) => user.appointments, { onDelete: 'CASCADE' })
  @JoinColumn()
  patient: User;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, {
    onDelete: 'CASCADE',
  })
  doctor: Doctor;

  @OneToOne(() => Prescription, (prescription) => prescription.appointment, {
    onDelete: 'CASCADE',
  })
  prescription: Prescription;
}
