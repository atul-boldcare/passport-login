import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Customer } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Customer)
    private userRepository: EntityRepository<Customer>,
  ) {}

  helloWorld() {
    return 'hello world';
  }

  findOne(username: string) {
    return this.userRepository.findOne({ username });
  }

  async register(username: string, password: string) {
    let user = await this.findOne(username);

    if (user !== null) throw new BadRequestException('User already exists');

    const salt = await bcrypt.genSalt(12);
    password = await bcrypt.hash(password, salt);
    user = await this.userRepository.create({ username, password });
    console.log(user);
    this.userRepository.persistAndFlush(user);
    return user;
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const { email } = req.user;
    const password = 'password';
    try {
      await this.register(email, password);
    } catch (err) {}

    req.logIn(req.user, (err) => {
      if (err) return err;
    });
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
