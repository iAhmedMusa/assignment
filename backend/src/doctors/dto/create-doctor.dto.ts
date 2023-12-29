import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { Specialties } from '../entities/doctor.entity';
export class CreateDoctorDto {
  @IsNotEmpty({ message: 'Provide doctor name' })
  name: string;

  @IsEmail({}, { message: 'Provide a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Provide Password' })
  @MinLength(6, { message: 'Password should be at least 6 character' })
  password: string;

  @IsNotEmpty({ message: 'Provide a phone number' })
  @IsMobilePhone()
  phone_number: string;

  @IsNotEmpty({ message: 'Provide your title' })
  title: string;

  @IsNotEmpty({ message: 'Provide your registration number' })
  reg_number: string;

  @IsNotEmpty({ message: 'provide your specialty' })
  @IsEnum(Specialties)
  specialist: Specialties;
}
