import { IsNotEmpty, IsEmail, MinLength, IsMobilePhone } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Provide user name' })
  name: string;

  @IsEmail({}, { message: 'Provide a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Provide Password' })
  @MinLength(6, { message: 'Password should be at least 6 character' })
  password: string;

  @IsNotEmpty({ message: 'Provide a phone number' })
  @IsMobilePhone()
  phone_number: string;
}
