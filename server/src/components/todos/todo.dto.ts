import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class TodoDTO {
  @IsNotEmpty()
  @IsString()
  creatorId: string;

  @IsNotEmpty()
  @IsString()
  todoText: string;
}

export class UpdateTodoDTO {
  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;
}
