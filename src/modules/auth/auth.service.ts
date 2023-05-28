import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { UserPayload } from './models/UserPayload.model';
import { UserService } from '../user/user.service';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signin(dto: AuthDto): Promise<UserToken> {
    const { email, password } = dto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Wrong credentials');
    }

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    const jwtToken = await this.jwtService.signAsync(payload);

    return { token: jwtToken };
  }
}
