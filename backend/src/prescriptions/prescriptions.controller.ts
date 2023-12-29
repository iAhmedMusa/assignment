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
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserTypes } from 'src/auth/user-types.guard';
import { UserType } from 'src/users/entities/user.entity';
import { Prescription } from './entities/prescription.entity';
import { Equal } from 'typeorm';
import { DoctorAdviceDto } from './dto/doctor-advice.dto';
import { AppointPharmacistDto } from './dto/appoint-pharmacist.dto';
import { PharmacistAdviceDto } from './dto/pharmacist-advice.dto';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @UseGuards(AuthGuard, new UserTypes([UserType.Patient]))
  @Post()
  async create(
    @Body() createPrescriptionDto: CreatePrescriptionDto,
    @Request() req: any,
  ): Promise<Prescription> {
    return await this.prescriptionsService.create(
      createPrescriptionDto,
      req.user,
    );
  }

  @UseGuards(
    AuthGuard,
    new UserTypes([UserType.Doctor, UserType.Patient, UserType.Pharmacist]),
  )
  @Get()
  findAll(@Request() req: any): Promise<Prescription[]> {
    const { sub, doctor, pharmacist, type } = req.user;

    const options: any = {
      relations: {
        pharmacist: {
          user: true,
        },
        appointment: {
          patient: true,
          doctor: {
            user: true,
          },
        },
      },
      order: {
        created_at: 'DESC',
      },
    };

    if (type === UserType.Patient) {
      options.where = {
        appointment: {
          patient: {
            id: Equal(+sub),
          },
        },
      };
    } else if (type === UserType.Doctor) {
      options.where = {
        appointment: {
          doctor: {
            id: Equal(+doctor),
          },
        },
      };
    } else if (type === UserType.Pharmacist) {
      options.where = {
        pharmacist: {
          id: Equal(+pharmacist),
        },
      };
    }

    return this.prescriptionsService.findAll(options);
  }

  @UseGuards(
    AuthGuard,
    new UserTypes([UserType.Doctor, UserType.Patient, UserType.Pharmacist]),
  )
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<Prescription> {
    const { sub, doctor, pharmacist, type } = req.user;

    const options: any = {
      where: {
        id: Equal(+id),
      },
      relations: {
        pharmacist: {
          user: true,
        },
        appointment: {
          patient: true,
          doctor: {
            user: true,
          },
        },
      },
    };

    if (type === UserType.Patient) {
      options.where = {
        ...options.where,
        appointment: {
          patient: {
            id: Equal(+sub),
          },
        },
      };
    } else if (type === UserType.Doctor) {
      options.where = {
        ...options.where,
        appointment: {
          doctor: {
            id: Equal(+doctor),
          },
        },
      };
    } else if (type === UserType.Pharmacist) {
      options.where = {
        ...options.where,
        pharmacist: {
          id: Equal(+pharmacist),
        },
      };
    }
    return await this.prescriptionsService.findOne(options);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  // ) {
  //   return this.prescriptionsService.update(+id, updatePrescriptionDto);
  // }

  @UseGuards(AuthGuard, new UserTypes([UserType.Doctor]))
  @Patch('doctor-advice/:id')
  async doctorAdvice(
    @Param('id') id: string,
    @Body() doctorAdviceDto: DoctorAdviceDto,
    @Request() req: any,
  ) {
    return this.prescriptionsService.doctorAdvice(
      +id,
      doctorAdviceDto,
      req.user,
    );
  }

  @UseGuards(AuthGuard, new UserTypes([UserType.Patient]))
  @Patch('appoint-pharmacist/:id')
  async appointPharmacist(
    @Param('id') id: string,
    @Body() appointPharmacistDto: AppointPharmacistDto,
    @Request() req: any,
  ) {
    return await this.prescriptionsService.appointPharmacist(
      +id,
      appointPharmacistDto,
      req.user,
    );
  }

  @UseGuards(AuthGuard, new UserTypes([UserType.Pharmacist]))
  @Patch('pharmacist-advice/:id')
  async pharmacistAdvice(
    @Param('id') id: string,
    @Body() pharmacistAdviceDto: PharmacistAdviceDto,
    @Request() req: any,
  ) {
    return await this.prescriptionsService.pharmacistAdvice(
      +id,
      pharmacistAdviceDto,
      req.user,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionsService.remove(+id);
  }
}
