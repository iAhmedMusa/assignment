import { IsEnum, IsNotEmpty } from 'class-validator';
import { AppointmentStatus } from '../entities/appointment.entity';

export class UpdateAppointmentDto {
  @IsNotEmpty({ message: 'provide the status of appointment' })
  @IsEnum(AppointmentStatus, {
    message: 'provided status of appointment is not acceptable',
  })
  status: AppointmentStatus;
}
