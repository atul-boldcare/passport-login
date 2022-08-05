import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super();
  }
  serializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: (err: Error, user: any) => void) {
    // const user = await this.authService.findUser(payload.email);
    console.log(payload);

    // return user ? done(null, user) : done(null, null);
    done(null, payload);
  }
}
