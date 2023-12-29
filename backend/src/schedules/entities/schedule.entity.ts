import { Doctor } from 'src/doctors/entities/doctor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  sunday_start: string;

  @Column({ type: 'varchar', nullable: true })
  sunday_end: string;

  @Column({ type: 'varchar', nullable: true })
  monday_start: string;

  @Column({ type: 'varchar', nullable: true })
  monday_end: string;

  @Column({ type: 'varchar', nullable: true })
  tuesday_start: string;

  @Column({ type: 'varchar', nullable: true })
  tuesday_end: string;

  @Column({ type: 'varchar', nullable: true })
  wednesday_start: string;

  @Column({ type: 'varchar', nullable: true })
  wednesday_end: string;

  @Column({ type: 'varchar', nullable: true })
  thursday_start: string;

  @Column({ type: 'varchar', nullable: true })
  thursday_end: string;

  @Column({ type: 'varchar', nullable: true })
  friday_start: string;

  @Column({ type: 'varchar', nullable: true })
  friday_end: string;

  @Column({ type: 'varchar', nullable: true })
  saturday_start: string;

  @Column({ type: 'varchar', nullable: true })
  saturday_end: string;

  @OneToOne(() => Doctor, (doctor) => doctor.schedule, { nullable: false })
  @JoinColumn()
  doctor: Doctor;
}
