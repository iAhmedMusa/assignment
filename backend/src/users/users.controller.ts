import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserType } from './entities/user.entity';
import { SignInDto } from './dto/signIn-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAuthenticatedUser } from './dto/create-google-authenticated-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(
      createUserDto,
      UserType.Patient,
    );

    try {
      return await this.usersService.tokenGenerator(user);
    } catch (error) {
      throw error;
    }
  }

  // @UseGuards(AuthGuard, new UserTypes([UserType.Admin]))
  @Get()
  async findAll(@Query('type') type: undefined | UserType): Promise<User[]> {
    const options: any = {
      relations: {
        doctor: true,
        pharmacist: true,
      },
    };
    if (type) {
      options.where = {
        type,
      };
    }
    return await this.usersService.findAll(options);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne({
      where: {
        id,
      },
      relations: {
        doctor: true,
        pharmacist: true,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ) {
    return this.usersService.update(+id, updateUserDto, req);
  }

  // @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() request: any) {
    // if (request.user.type !== UserType.Admin) {
    //   if (+id !== request.user.sub) {
    //     throw new UnauthorizedException('Invalid credential');
    //   }
    // }

    return await this.usersService.remove(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.usersService.signIn(signInDto);

    try {
      return await this.usersService.tokenGenerator({
        ...user,
        pharmacist: user?.pharmacist?.id || undefined,
        doctor: user?.doctor?.id,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post('auth-user')
  async authUser(@Body() authUserInfo: CreateAuthenticatedUser) {
    return await this.usersService.authUser(authUserInfo);
  }
}
