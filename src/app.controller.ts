import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('los')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('testers')
  getHello(): string {
    return this.appService.getHello();
  }
}
