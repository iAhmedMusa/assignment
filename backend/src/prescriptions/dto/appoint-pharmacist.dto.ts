import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AppointPharmacistDto {
  @IsNotEmpty({ message: 'provide pharmacist info' })
  @IsNumber({}, { message: 'provide valid pharmacist info' })
  @IsPositive({ message: 'provide valid pharmacist info' })
  pharmacistId: number;
}
