import { IsString, IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
