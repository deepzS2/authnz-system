import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PermissionUtil } from '@utils/permissions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly SALT_ROUND = 10;
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const salt = bcrypt.genSaltSync(this.SALT_ROUND);
    const hashedPassword = bcrypt.hashSync(data.password, salt);

    data.password = hashedPassword;

    return await this.prisma.user.create({
      data,
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return users.map((user) => {
      const permissions = new PermissionUtil(user.permissions);

      return {
        ...user,
        permissionsObject: permissions.toJSON(),
      };
    });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return;

    const permissions = new PermissionUtil(user.permissions);

    return {
      ...user,
      permissionsObject: permissions.toJSON(),
    };
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return;

    const permissions = new PermissionUtil(user.permissions);

    return {
      ...user,
      permissionsObject: permissions.toJSON(),
    };
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { where, data } = params;
    return await this.prisma.user.update({
      where,
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
