import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthenticatedUser {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
