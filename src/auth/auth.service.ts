import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async findUser(username: string) {
    const user = this.usersService.findOne(username);
    return user;
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return null;
    // throw new UnauthorizedException('invalid username or password');
    return user;
  }

  // async login(user: any) {
  //   const payload = { name: user.name, sub: user.id };

  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
