import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreatePrescriptionDto {
  @IsNotEmpty({ message: 'write about your disease' })
  disease: string;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'age should be numeric value' },
  )
  @Min(0, { message: 'age should not be less than zero' })
  age: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Weight should be numeric value' },
  )
  @Min(0, { message: 'Weight should not be less than zero' })
  weight: number;

  @IsOptional()
  @IsBoolean({ message: 'Allergy should be boolean value' })
  allergies: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Diabetes should be boolean value' })
  diabetes: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Blood Pressure should be boolean value' })
  blood_pressure: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Smoking Have should be boolean value' })
  smoking_habit: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Alcohol Consumption should be boolean value' })
  alcohol_consumption: boolean;

  @IsOptional()
  details: string;

  @IsNotEmpty({ message: 'Provide appointment info' })
  @IsNumber({}, { message: 'Provide valid appointment info' })
  @Min(1, { message: 'Provide valid appointment info' })
  appointment_id: number;
}
