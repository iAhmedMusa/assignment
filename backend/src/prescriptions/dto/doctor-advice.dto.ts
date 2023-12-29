import { IsNotEmpty, IsOptional } from 'class-validator';

export class DoctorAdviceDto {
  @IsNotEmpty({ message: 'Give your advice' })
  doctor_advices: string;

  @IsOptional()
  tests: string;

  @IsOptional()
  reports: string;
}
