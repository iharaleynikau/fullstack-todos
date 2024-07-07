import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './components/user/user.module';
import { TodosModule } from './components/todos/todos.module';
import { AuthModule } from './components/auth/auth.module';

@Module({
  imports: [UserModule, TodosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
