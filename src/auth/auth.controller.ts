import { UsersService } from '@/users/users.service'
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { Private } from './auth.decorator'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user)
  }

  @Private()
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const user = await this.usersService.findById(req.user.id)

    return user
  }
}
