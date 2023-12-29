import {
  IsDateString,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import GenderType from 'src/constants/gender-type.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Provide date of birth' })
  @IsDateString({}, { message: 'provide date in right formate' })
  dob: Date;

  @IsOptional()
  @IsMobilePhone()
  phone_number: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Provide your city' })
  city: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Provide your state' })
  state: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Provide your zip code' })
  zip: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Provide your country' })
  country: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Provide date of birth' })
  @IsEnum(GenderType, { message: 'Provide a valid gender' })
  gender: GenderType;
}
