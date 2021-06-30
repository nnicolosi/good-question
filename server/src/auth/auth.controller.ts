import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SetPasswordDto } from './dtos/set-password.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  logout(@Request() request) {
    return request.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/set-password')
  reset(@Request() request, @Body() setPasswordDto: SetPasswordDto) {
    return this.authService.setPassword(request.user.id, setPasswordDto);
  }
}
