import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserTypes } from 'src/auth/user-types.guard';
import { UserType } from 'src/users/entities/user.entity';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.doctorsService.create(createDoctorDto);
  }

  @Get()
  async findAll(@Query('specialists') specialists: string) {
    const options: any = {
      relations: {
        user: true,
        schedule: true,
      },
    };

    if (specialists) {
      options.where = {
        specialist: specialists,
      };
    }

    return await this.doctorsService.findAll(options);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const options: any = {
      where: {
        id: +id,
      },
      relations: {
        user: true,
        schedule: true,
      },
    };
    return this.doctorsService.findOne(options);
  }

  @UseGuards(AuthGuard, new UserTypes([UserType.Doctor]))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @Request() req: any,
  ) {
    return await this.doctorsService.update(+id, updateDoctorDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }
}
