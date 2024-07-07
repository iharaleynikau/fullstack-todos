import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  newPassword: string;

  @IsArray()
  friendsList: [];
}
