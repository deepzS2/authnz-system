import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Permissions } from '@utils/permissions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    await this.seedData();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  private async seedData() {
    const salt = bcrypt.genSaltSync(10);

    await this.user.upsert({
      where: { email: 'admin@admin.com' },
      update: {
        password: bcrypt.hashSync('admin123', salt),
      },
      create: {
        email: 'admin@admin.com',
        name: 'Admin',
        password: bcrypt.hashSync('admin123', salt),
        permissions: Permissions.Admin,
      },
    });
  }
}
