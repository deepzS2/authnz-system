import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Private } from '@auth/auth.decorator';
import { Permissions } from '@utils/permissions';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Private(Permissions.Admin)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
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
    const user = await this.usersService.findById(+id);

    delete user.password;

    return user;
  }

  @Private(Permissions.Admin)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  @Private(Permissions.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
