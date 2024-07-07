import {
  Injectable,
  UnauthorizedException,
  // ForbiddenException,
  // HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from './auth.dto';
import { User } from '@prisma/client';
import { UserService } from 'src/components/user/user.service';
import 'dotenv';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(body: User) {
    const user = await this.userService.getSingleUserByLogin(body.login);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const isValidPassword = body.password === user.password;

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const tokens = await this.generateTokensPair(user.id, user.login);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPass } = user;

    return { ...userWithoutPass, tokens };
  }

  async signup(body: UserDTO) {
    const doesUserExist = await this.userService.getSingleUserByLogin(
      body.login,
    );

    if (doesUserExist) {
      throw new UnauthorizedException('A user with this login already exists');
    }

    const user = await this.userService.createUser({
      ...body,
      password: body.password,
    });

    const tokens = await this.generateTokensPair(user.id, user.login);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPass } = user;

    return { ...userWithoutPass, tokens };
  }

  async generateTokensPair(userId: string, login: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(
        {
          userId,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
          secret: process.env.JWT_SECRET_KEY,
        },
        { login },
      ),
      this.signToken(
        {
          userId,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
        { login },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  private async signToken(
    {
      userId,
      expiresIn,
      secret,
    }: { userId: string; expiresIn: string; secret: string },
    payload,
  ) {
    return await this.jwtService.signAsync(
      {
        userId,
        ...payload,
      },
      {
        secret,
        expiresIn,
      },
    );
  }
}
