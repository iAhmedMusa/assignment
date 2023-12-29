import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { specialties as doctorSpecialties } from './constants/specialties';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('type-of-specialties')
  specialties(): string[] {
    return doctorSpecialties;
  }
}
