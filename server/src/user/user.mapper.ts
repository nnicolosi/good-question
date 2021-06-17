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
    };
  }

  async mapCreateUserDtoToEntity(createUserDto: CreateUserDto): Promise<User> {
    return {
      id: 0,
      username: createUserDto.username,
      password: await bcrypt.hash(createUserDto.password, 10),
      role: createUserDto.role,
    };
  }
}
