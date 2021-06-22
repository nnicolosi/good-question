import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserMapper } from './user/user.mapper';
import { UserService } from './user/user.service';
import { Role } from './common/enums/role.enum';
import {
  adminUsername,
  adminPassword,
} from './config/secrets';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly userMapper: UserMapper, private readonly userService: UserService) { }

  async onApplicationBootstrap() {
    const userCount = await this.userService.findCount();

    if (!userCount) {
      this.userMapper.mapCreateUserDtoToEntity({
        username: adminUsername,
        password: adminPassword,
        role: Role.Admin,
        firstName: 'Administrator',
        lastName: ''
      }).then((admin) => {
        this.userService.create(admin);
      });
    }
  }
}
