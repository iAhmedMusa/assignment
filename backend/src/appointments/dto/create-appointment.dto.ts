import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty({ message: 'Provide doctor id' })
  @IsNumber({}, { message: 'Provide valid doctor info' })
  @Min(1, { message: 'Provide valid doctor info' })
  doctor: number;
}
