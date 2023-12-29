import { IsNumberString, IsOptional, Length } from 'class-validator';

export class CreateScheduleDto {
  @IsOptional()
  @IsNumberString({}, { message: 'sunday start time is not acceptable' })
  @Length(4, 4, { message: 'sunday start time is not acceptable' })
  sunday_start: string;

  @IsOptional()
  @IsNumberString({}, { message: 'sunday end time is not acceptable' })
  @Length(4, 4, { message: 'sunday end time is not acceptable' })
  sunday_end: string;

  @IsOptional()
  @IsNumberString({}, { message: 'monday start time is not acceptable' })
  @Length(4, 4, { message: 'monday start time is not acceptable' })
  monday_start: string;

  @IsOptional()
  @IsNumberString({}, { message: 'monday end time is not acceptable' })
  @Length(4, 4, { message: 'monday end time is not acceptable' })
  monday_end: string;

  @IsOptional()
  @IsNumberString({}, { message: 'tuesday start time is not acceptable' })
  @Length(4, 4, { message: 'tuesday start time is not acceptable' })
  tuesday_start: string;

  @IsOptional()
  @IsNumberString({}, { message: 'tuesday end time is not acceptable' })
  @Length(4, 4, { message: 'tuesday end time is not acceptable' })
  tuesday_end: string;

  @IsOptional()
  @IsNumberString({}, { message: 'wednesday start time is not acceptable' })
  @Length(4, 4, { message: 'wednesday start time is not acceptable' })
  wednesday_start: string;

  @IsOptional()
  @IsNumberString({}, { message: 'wednesday end time is not acceptable' })
  @Length(4, 4, { message: 'wednesday end time is not acceptable' })
  wednesday_end: string;

  @IsOptional()
  @IsNumberString({}, { message: 'thursday start time is not acceptable' })
  @Length(4, 4, { message: 'thursday start time is not acceptable' })
  thursday_start: string;

  @IsOptional()
  @IsNumberString({}, { message: 'thursday end time is not acceptable' })
  @Length(4, 4, { message: 'thursday end time is not acceptable' })
  thursday_end: string;

  @IsOptional()
  @IsNumberString({}, { message: 'friday start time is not acceptable' })
  @Length(4, 4, { message: 'friday start time is not acceptable' })
  friday_start: string;

  @IsOptional()
  @IsNumberString({}, { message: 'friday end time is not acceptable' })
  @Length(4, 4, { message: 'friday end time is not acceptable' })
  friday_end: string;

  @IsOptional()
  @IsNumberString({}, { message: 'saturday start time is not acceptable' })
  @Length(4, 4, { message: 'saturday start time is not acceptable' })
  saturday_start: string;

  @IsOptional()
  @IsNumberString({}, { message: 'saturday end time is not acceptable' })
  @Length(4, 4, { message: 'saturday end time is not acceptable' })
  saturday_end: string;

  constructor() {
    this.friday_end = null;
    this.friday_start = null;
    this.monday_end = null;
    this.monday_start = null;
    this.saturday_end = null;
    this.saturday_start = null;
    this.sunday_end = null;
    this.sunday_start = null;
    this.thursday_end = null;
    this.thursday_start = null;
    this.tuesday_end = null;
    this.tuesday_start = null;
    this.wednesday_end = null;
    this.wednesday_start = null;
  }
}
