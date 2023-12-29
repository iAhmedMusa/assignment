import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Specialties {
  General = 'General Physician',
  Pediatrics = 'Pediatrics / Child Care',
  Gynaecology = 'Gynaecology',
  Neurology = 'Neurology / Brain',
  Pulmonology = 'Pulmonology / Lungs',
  Nutritionist = 'Nutritionist',
  Gastroenterology = 'Gastroenterology',
  Cardiology = 'Cardiology / Heart',
  Ophthalmology = 'Ophthalmology / Eye',
  Dentistry = 'Dentistry / Dental Care',
  Endocrinology = 'Endocrinology / Diabetes',
  Occupational = 'Occupational therapy',
  Nephrology = 'Nephrology / Kidney',
  Obstetrics = 'Obstetrics',
  ENT = 'ENT / Ear, Nose and Throat',
  Parasitology = 'Parasitology',
  Podiatry = 'Podiatry',
  Oncology = 'Oncology',
  Dermatology = 'Dermatology',
  Psychological = 'Psychological counsellor',
  Rheumatology = 'Rheumatology',
  Urology = 'Urology',
  Chiropractic = 'Chiropractic',
}

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  title: string;

  @Column({
    type: 'varchar',
  })
  reg_number: string;

  @Column({
    type: 'enum',
    enum: Specialties,
  })
  specialist: Specialties;

  @Column({
    type: 'int',
    nullable: true,
  })
  experience: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  bio: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // relationships

  @OneToOne(() => User, (user) => user.doctor, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToOne(() => Schedule, (schedule) => schedule.doctor, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  schedule: Schedule;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];
}
