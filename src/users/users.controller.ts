import { Private } from '@auth/auth.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Permissions } from '@utils/permissions';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Private(Permissions.Admin)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findByEmail(createUserDto.email);

    if (userExists)
      throw new BadRequestException({
        message: 'An user with this email already exists!',
      });

    return await this.usersService.create(createUserDto);
  }

  @Private(Permissions.Read)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return users.map((user) => {
      delete user.password;

      return user;
    });
  }

  @Private(Permissions.Read)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(Number(id));

    if (!user)
      throw new NotFoundException({
        message: 'User not found with that ID',
      });

    delete user.password;

    return user;
  }

  @Private(Permissions.Admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userExists = await this.usersService.findById(Number(id));

    if (!userExists)
      throw new NotFoundException({
        message: 'User not found with that ID',
      });

    return await this.usersService.update({
      where: {
        id: Number(id),
      },
      data: updateUserDto,
    });
  }

  @Private(Permissions.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const userExists = await this.usersService.findById(Number(id));

    if (!userExists)
      throw new NotFoundException({
        message: 'User not found with that ID',
      });

    return await this.usersService.remove(Number(id));
  }
}
