import { Module, forwardRef } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/components/auth/auth.module';

@Module({
  controllers: [TodosController],
  providers: [TodosService, PrismaService],
  imports: [forwardRef(() => AuthModule)],
  exports: [TodosService],
})
export class TodosModule {}
