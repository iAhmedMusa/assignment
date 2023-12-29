import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: 'Provide an email' })
  @IsEmail({}, { message: 'Provide a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Provide your password' })
  @MinLength(6, { message: 'Password should be at least 6 character' })
  password: string;
}
