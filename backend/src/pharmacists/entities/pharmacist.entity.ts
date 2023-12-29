import { Prescription } from 'src/prescriptions/entities/prescription.entity';
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

@Entity()
export class Pharmacist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  title: string;

  @Column({
    type: 'varchar',
  })
  reg_number: string;

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

  @OneToOne(() => User, (user) => user.pharmacist, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => Prescription, (prescription) => prescription.pharmacist, {
    onDelete: 'CASCADE',
  })
  prescriptions: Prescription[];
}
