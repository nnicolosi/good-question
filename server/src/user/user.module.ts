import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserMapper } from './user.mapper';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserController, UserMapper, UserService],
  exports: [UserController, UserMapper, UserService],
})
export class UserModule {}
