import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/types';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getSingleUser(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getSingleUserByLogin(login: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { login },
    });

    if (user) {
      return user;
    }
  }

  async createUser(body: CreateUserDTO): Promise<User> {
    const doesUserExist = await this.getSingleUserByLogin(body.login);

    if (doesUserExist) {
      throw new HttpException(
        'A user with this login already exists',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.prisma.user.create({
      data: {
        ...body,
        id: uuidv4(),
        friendsList: [],
      },
    });
  }

  async updateUser(body: UpdateUserDTO, id: string): Promise<User> {
    const user = await this.getSingleUser(id);

    const isValidPassword = body.password === user.password;

    if (!isValidPassword) {
      throw new HttpException('Password is wrong', HttpStatus.FORBIDDEN);
    }

    const updatedData = {
      password: body.newPassword ? body.newPassword : user.password,
      friendsList: body.friendsList ? body.friendsList : user.friendsList,
    };

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updatedData,
      },
    });

    return updatedUser;
  }

  async deleteUser(id: string) {
    await this.getSingleUser(id);

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
