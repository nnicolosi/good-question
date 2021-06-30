import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserMapper {
  mapEntityToDto(user: User): UserDto {
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      active: user.active,
      reset: user.reset
    };
  }

  async mapCreateUserDtoToEntity(dto: CreateUserDto): Promise<User> {
    return {
      id: 0,
      username: dto.username,
      password: await bcrypt.hash(dto.password, 10),
      role: dto.role,
      firstName: dto.firstName,
      lastName: dto.lastName,
      active: true,
      reset: true
    };
  }
}
