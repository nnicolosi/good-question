import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('/health')
  healthCheck(): any {
    return { status: this.appService.getStatus() };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
