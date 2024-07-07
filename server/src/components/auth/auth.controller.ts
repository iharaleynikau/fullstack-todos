import {
  Controller,
  Body,
  Post,
  Request,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserDTO } from './auth.dto';
import { User } from 'src/types';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: User) {
    return this.authService.login(body);
  }

  @Post('/signup')
  signup(@Body() body: UserDTO) {
    return this.authService.signup(body);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Request() req) {
    return this.authService.generateTokensPair(req.user.id, req.user.login);
  }
}
