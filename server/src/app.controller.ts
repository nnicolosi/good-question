import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './auth/public.decorator';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) { }

  @Public()
  @Get('/health')
  healthCheck(): any {
    return { status: this.appService.getStatus() };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth/logout')
  logout(@Request() request) {
    return request.logout();
  }
}
