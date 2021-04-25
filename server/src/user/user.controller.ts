import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from './dtos/user.dto';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userMapper: UserMapper,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => this.userMapper.mapEntityToDto(user));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    const user = await this.userService.findById(id);
    return this.userMapper.mapEntityToDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = this.userMapper.mapCreateUserDtoToEntity(createUserDto);
    const response = await this.userService.create(user);
    return this.userMapper.mapEntityToDto(response);
  }
}
