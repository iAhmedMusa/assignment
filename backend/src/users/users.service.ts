import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserType } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { SignInDto } from './dto/signIn-user.dto';
import { CreateAuthenticatedUser } from './dto/create-google-authenticated-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    type: UserType.Doctor | UserType.Patient | UserType.Pharmacist,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = {
      ...createUserDto,
      password: hashedPassword,
      type,
    };

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException('This user already listed');
      }

      throw error;
    }
  }

  async findAll(options: any) {
    return await this.userRepository.find(options);
  }

  async findOne(options: any) {
    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, req: any) {
    const requestedUser = req.user;
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (
      !(
        user.id === requestedUser.sub &&
        user.email === requestedUser.email &&
        user.type === requestedUser.type
      )
    ) {
      throw new UnauthorizedException(
        "Don't have authority to update this user",
      );
    }

    try {
      const updatedUser = await this.userRepository.save({
        ...user,
        ...updateUserDto,
      });

      delete updatedUser.password;
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    const userToRemove = await this.findOne({
      where: {
        id,
      },
    });

    if (!userToRemove) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.userRepository.remove(userToRemove);
      throw new HttpException('Delete user successfully', 209);
    } catch (error) {
      throw error;
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: signInDto.email,
      },
      relations: {
        doctor: true,
        pharmacist: true,
      },
      select: ['id', 'email', 'password', 'name', 'phone_number', 'type'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credential');
    }

    const isPasswordMatch = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credential');
    }

    delete user.password;

    return user;
  }

  async tokenGenerator(user: any) {
    const { id, email, name, type, doctor, pharmacist } = user;

    const payload: any = {
      sub: id,
      email,
      name,
      type,
    };

    if (doctor) {
      payload.doctor = doctor;
    }

    if (pharmacist) {
      payload.pharmacist = pharmacist;
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async authUser(authUserInfo: CreateAuthenticatedUser) {
    let user = await this.userRepository.findOne({
      where: { email: Equal(authUserInfo.email) },
    });

    if (!user) {
      user = await this.userRepository.save(authUserInfo);
    }

    return await this.tokenGenerator(user);
  }
}
