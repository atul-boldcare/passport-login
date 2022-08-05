import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { GoogleAuthGuard } from 'src/auth/google-auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  hello() {
    return this.usersService.helloWorld();
  }

  @Post('/register')
  register(@Body() body: CreateUserDto) {
    return this.usersService.register(body.username, body.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return { msg: 'logged in' };
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@Request() req) {
    console.log(req);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('redirect')
  googleAuthRedirct(@Request() req) {
    return this.usersService.googleLogin(req);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  protected() {
    return 'protected route';
  }

  @Get('logout')
  logout(@Request() req) {
    req.logout((err) => {
      if (err) return err;
    });
  }
}
