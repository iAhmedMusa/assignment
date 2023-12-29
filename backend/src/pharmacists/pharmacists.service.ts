import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePharmacistDto } from './dto/create-pharmacist.dto';
import { UpdatePharmacistDto } from './dto/update-pharmacist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pharmacist } from './entities/pharmacist.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User, UserType } from 'src/users/entities/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class PharmacistsService {
  constructor(
    @InjectRepository(Pharmacist)
    private pharmacistRepository: Repository<Pharmacist>,
    private readonly usersService: UsersService,
  ) {}

  async create(createPharmacistDto: CreatePharmacistDto) {
    const user = {
      name: createPharmacistDto.name,
      email: createPharmacistDto.email,
      password: createPharmacistDto.password,
      phone_number: createPharmacistDto.phone_number,
    };

    const createUser = await this.usersService.create(
      user,
      UserType.Pharmacist,
    );

    if (!createUser) {
      throw new ConflictException("Doctor can't create");
    }

    const dto: any = {
      user: createUser,
      title: createPharmacistDto.title,
      reg_number: createPharmacistDto.reg_number,
    };

    try {
      const newPharmacist: Pharmacist = await this.pharmacistRepository.save(
        dto,
      );
      delete newPharmacist.user.password;
      return await this.usersService.tokenGenerator({
        ...newPharmacist.user,
        pharmacist: newPharmacist.id,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(options: any): Promise<Pharmacist[]> {
    return await this.pharmacistRepository.find(options);
  }

  async findOne(options: any): Promise<Pharmacist> {
    const pharmacist: Pharmacist = await this.pharmacistRepository.findOne(
      options,
    );

    if (!pharmacist) {
      throw new NotFoundException('Pharmacist not found');
    }

    return pharmacist;
  }

  async update(id: number, updatePharmacistDto: UpdatePharmacistDto, req: any) {
    const requestedPharmacist = req.user;
    const pharmacist: Pharmacist = await this.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!pharmacist) {
      throw new NotFoundException('Pharmacist not found');
    }

    if (
      !(
        pharmacist.user.id === requestedPharmacist.sub &&
        pharmacist.user.email === requestedPharmacist.email &&
        pharmacist.user.type === requestedPharmacist.type
      )
    ) {
      throw new UnauthorizedException(
        "You haven't authority to change this pharmacist info.",
      );
    }

    let user: User = pharmacist.user;

    const userUpdateData: UpdateUserDto = {
      dob: updatePharmacistDto?.dob,
      gender: updatePharmacistDto?.gender,
      city: updatePharmacistDto?.city,
      state: updatePharmacistDto?.state,
      zip: updatePharmacistDto?.zip,
      country: updatePharmacistDto?.country,
      phone_number: updatePharmacistDto?.phone_number,
    };

    Object.keys(userUpdateData).map((key) => {
      if (!userUpdateData[key]) {
        delete userUpdateData[key];
      }
    });

    user = await this.usersService.update(user.id, userUpdateData, req);

    delete updatePharmacistDto?.dob;
    delete updatePharmacistDto?.gender;
    delete updatePharmacistDto?.city;
    delete updatePharmacistDto?.state;
    delete updatePharmacistDto?.zip;
    delete updatePharmacistDto?.country;

    const updatedPharmacist: any = {
      ...pharmacist,
      ...updatePharmacistDto,
      user: user || pharmacist.user,
      updated_at: new Date().toISOString(),
    };

    try {
      return await this.pharmacistRepository.save(updatedPharmacist);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} pharmacist`;
  }
}
