import { AuthModule } from '@auth/auth.module'
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard'
import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'

import { PostsModule } from './posts/posts.module'
import { PrismaService } from './services/prisma.service'
import { UsersModule } from './users/users.module'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [PostsModule],
})
class PrismaModule {}

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
