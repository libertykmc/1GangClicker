import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    username: string,
    password: string,
    fullName: string,
    birthDate: string,
  ) {
    const existingUser = await this.usersRepository.findOne({
      where: { username },
    });
    if (existingUser) throw new BadRequestException('Username already exists');

    // проверим корректность даты
    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!dateRegex.test(birthDate)) {
      throw new BadRequestException('Date must be in format DD.MM.YYYY');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
      fullName,
      birthDate,
    });

    await this.usersRepository.save(newUser);
    return { message: 'Registration successful' };
  }
  async login(username: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = { id: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return { access_token: token, username: user.username };
  }
}
