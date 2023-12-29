import { IsBoolean } from 'class-validator';

export class PharmacistAdviceDto {
  @IsBoolean({ message: 'give your advice as pharmacist.' })
  pharmacist_advice: boolean;
}
