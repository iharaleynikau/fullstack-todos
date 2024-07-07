import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ExcludePasswordInterceptor } from './exclude.interceptor';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/components/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService, ExcludePasswordInterceptor, PrismaService],
  imports: [forwardRef(() => AuthModule)],
  exports: [UserService],
})
export class UserModule {}
