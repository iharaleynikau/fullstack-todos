import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { Todo } from 'src/types';
import { TodoDTO, UpdateTodoDTO } from './todo.dto';
import { TodosService } from './todos.service';

@Controller('/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getAllTodos(): Promise<Todo[]> {
    return this.todosService.getAllTodos();
  }

  @Get('/byCreator/:id')
  async getAllTodosByCreatorId(@Param('id') id: string): Promise<Todo[]> {
    return this.todosService.getAllTodosByCreatorId(id);
  }

  @Get(':id')
  async getSingleTodo(@Param('id', ParseUUIDPipe) id: string): Promise<Todo> {
    return this.todosService.getSingleTodo(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTodo(@Body() body: TodoDTO) {
    return this.todosService.createTodo(body);
  }

  @Put(':id')
  async updateUser(
    @Body() body: UpdateTodoDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Todo> {
    return this.todosService.updateTodo(body, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTodo(@Param('id', ParseUUIDPipe) id: string) {
    return this.todosService.deleteTodo(id);
  }
}
