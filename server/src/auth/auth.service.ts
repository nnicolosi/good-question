import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMapper } from '../user/user.mapper';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userMapper: UserMapper,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user) {
      const isValidLogin = await bcrypt.compare(password, user.password);

      if (isValidLogin) {
        return this.userMapper.mapEntityToDto(user);
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
