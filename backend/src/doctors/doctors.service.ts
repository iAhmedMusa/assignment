import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User, UserType } from 'src/users/entities/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,
    private usersService: UsersService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const user = {
      name: createDoctorDto.name,
      email: createDoctorDto.email,
      password: createDoctorDto.password,
      phone_number: createDoctorDto.phone_number,
    };

    const createUser = await this.usersService.create(user, UserType.Doctor);

    if (!createUser) {
      throw new ConflictException("Doctor can't create");
    }

    const dto: any = {
      user: createUser,
      title: createDoctorDto.title,
      reg_number: createDoctorDto.reg_number,
      specialist: createDoctorDto.specialist,
    };

    try {
      const newDoctor: Doctor = await this.doctorRepository.save(dto);
      return await this.usersService.tokenGenerator({
        ...newDoctor.user,
        doctor: newDoctor.id,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(options: any) {
    return await this.doctorRepository.find(options);
  }

  async findOne(options: any): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne(options);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto, req: any) {
    const requestedDoctor = req.user;
    const doctor: Doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    if (
      !(
        doctor.user.id === requestedDoctor.sub &&
        doctor.user.email === requestedDoctor.email &&
        doctor.user.type === requestedDoctor.type
      )
    ) {
      throw new UnauthorizedException(
        "You haven't authority to change this doctor info.",
      );
    }

    let user: User = doctor.user;
    const userUpdateData: UpdateUserDto = {
      dob: updateDoctorDto?.dob,
      gender: updateDoctorDto?.gender,
      city: updateDoctorDto?.city,
      state: updateDoctorDto?.state,
      zip: updateDoctorDto?.zip,
      country: updateDoctorDto?.country,
      phone_number: updateDoctorDto?.phone_number,
    };

    Object.keys(userUpdateData).map((key) => {
      if (!userUpdateData[key]) {
        delete userUpdateData[key];
      }
    });

    user = await this.usersService.update(user.id, userUpdateData, req);

    delete updateDoctorDto?.dob;
    delete updateDoctorDto?.gender;
    delete updateDoctorDto?.city;
    delete updateDoctorDto?.state;
    delete updateDoctorDto?.zip;
    delete updateDoctorDto?.country;

    const updatedDoctor: any = {
      ...doctor,
      ...updateDoctorDto,
      user: user || doctor.user,
      updated_at: new Date().toISOString(),
    };

    try {
      return await this.doctorRepository.save(updatedDoctor);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
