import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Public()
  @Get('/health')
  healthCheck(): any {
    return { status: this.appService.getStatus() };
  }
}
