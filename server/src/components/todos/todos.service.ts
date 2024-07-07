import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma.service';
import { Todo } from 'src/types';
import { TodoDTO, UpdateTodoDTO } from './todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async getAllTodos(): Promise<Todo[]> {
    return await this.prisma.todo.findMany();
  }

  async getAllTodosByCreatorId(creatorId: string): Promise<Todo[]> {
    return await this.prisma.todo.findMany({
      where: {
        creatorId,
      },
    });
  }

  async getSingleTodo(id: string): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new HttpException('Todo does not exist', HttpStatus.NOT_FOUND);
    }

    return todo;
  }

  async updateTodo(body: UpdateTodoDTO, id: string): Promise<Todo> {
    const todo = await this.getSingleTodo(id);

    if (!todo) {
      throw new HttpException('Todo does not exist', HttpStatus.NOT_FOUND);
    }

    const updateTodo = await this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        isCompleted: body.isCompleted,
      },
    });

    return updateTodo;
  }

  async createTodo(body: TodoDTO): Promise<Todo> {
    return await this.prisma.todo.create({
      data: {
        ...body,
        id: uuidv4(),
        isCompleted: false,
      },
    });
  }

  async deleteTodo(id: string) {
    await this.getSingleTodo(id);

    await this.prisma.todo.delete({
      where: { id },
    });
  }
}
