import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Must be a string' })
  readonly login;
  @IsString({ message: 'Must be a string' })
  readonly password;
}
