import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserTypes } from 'src/auth/user-types.guard';
import { UserType } from 'src/users/entities/user.entity';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}
  @UseGuards(AuthGuard, new UserTypes([UserType.Doctor]))
  @Post()
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
    @Request() req: any,
  ) {
    return await this.schedulesService.create(createScheduleDto, req.user);
  }

  // @Get()
  // findAll() {
  //   return this.schedulesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.schedulesService.findOne(+id);
  // }

  @UseGuards(AuthGuard, new UserTypes([UserType.Doctor]))
  @Patch()
  async update(
    @Body() updateScheduleDto: CreateScheduleDto,
    @Request() req: any,
  ) {
    return await this.schedulesService.update(updateScheduleDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(+id);
  }
}
