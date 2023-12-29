import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PharmacistsService } from './pharmacists.service';
import { CreatePharmacistDto } from './dto/create-pharmacist.dto';
import { UpdatePharmacistDto } from './dto/update-pharmacist.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserTypes } from 'src/auth/user-types.guard';
import { UserType } from 'src/users/entities/user.entity';

@Controller('pharmacists')
export class PharmacistsController {
  constructor(private readonly pharmacistsService: PharmacistsService) {}

  @Post()
  async create(@Body() createPharmacistDto: CreatePharmacistDto) {
    return await this.pharmacistsService.create(createPharmacistDto);
  }

  @Get()
  async findAll() {
    const options: any = {
      relations: {
        user: true,
      },
    };

    return await this.pharmacistsService.findAll(options);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const options: any = {
      where: {
        id: +id,
      },
      relations: {
        user: true,
      },
    };
    return await this.pharmacistsService.findOne(options);
  }

  @UseGuards(AuthGuard, new UserTypes([UserType.Pharmacist]))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePharmacistDto: UpdatePharmacistDto,
    @Request() req: any,
  ) {
    return await this.pharmacistsService.update(+id, updatePharmacistDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pharmacistsService.remove(+id);
  }
}
