import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { BookModule } from './book/book.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [UserModule, ProfileModule, BookModule, TagModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
