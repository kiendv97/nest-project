import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Controller } from './user/.controller';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [UserModule],
  controllers: [AppController, Controller, UserController],
  providers: [AppService],
})
export class AppModule {}
