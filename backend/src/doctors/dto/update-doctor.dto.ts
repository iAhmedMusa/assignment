import {
  IsDateString,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import GenderType from 'src/constants/gender-type.enum';

export class UpdateDoctorDto {
  @IsOptional()
  @IsNotEmpty({ message: 'title should not empty' })
  title: string;

  @IsOptional()
  @IsNotEmpty({ message: 'experience should not empty' })
  @IsNumber({}, { message: 'experience should be number' })
  @IsPositive({ message: 'experience should be non-negative number' })
  experience: number;

  @IsOptional()
  @IsMobilePhone()
  phone_number: string;

  @IsOptional()
  @IsNotEmpty({ message: 'city should not empty' })
  city: string;

  @IsOptional()
  @IsNotEmpty({ message: 'state should not empty' })
  state: string;

  @IsOptional()
  @IsNotEmpty({ message: 'county should not empty' })
  country: string;

  @IsOptional()
  @IsNotEmpty({ message: 'zip should not empty' })
  zip: string;

  @IsOptional()
  @IsNotEmpty({ message: 'bio should not empty' })
  bio: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Provide date of birth' })
  @IsDateString({}, { message: 'provide date in right formate' })
  dob: Date;

  @IsOptional()
  @IsNotEmpty({ message: 'Provide date of birth' })
  @IsEnum(GenderType, { message: 'Provide a valid gender' })
  gender: GenderType;
}
