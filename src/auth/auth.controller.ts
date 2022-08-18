import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Private } from './auth.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Private()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
