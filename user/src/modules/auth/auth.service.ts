import { Injectable } from '@nestjs/common';
import { RegisterUserBodyDto } from './dto/register-user-body.dto';
import { UserRepository } from 'src/shared/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { LoginUserBodyDto } from './dto/login-user.body.dto';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: RegisterUserBodyDto) {
    const existingUser = await this.userRepository.findOne({
      where: { username: body.username },
    });
    if (existingUser) {
      throw new RpcException({
        status: 'error',
        message: 'User already exists',
        code: 400,
      });
    }

    const password = await bcrypt.hash(body.password, 10);
    const newUser = await this.userRepository.save({
      username: body.username,
      password,
      name: body.name,
    });

    return { message: 'User registered successfully', user: newUser };
  }

  async login(body: LoginUserBodyDto) {
    const user = await this.userRepository.findOne({
      where: { username: body.username },
    });
    if (!user) {
      throw new RpcException({
        status: 'error',
        message: 'Wrong username or password!',
        code: 401,
      });
    }
    if (await this._validatePassword(body.password, user.password)) {
      const payload = {
        username: user.username,
        id: user.id,
        role: user.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new RpcException({
        status: 'error',
        message: 'Wrong username or password!',
        code: 401,
      });
    }
  }

  async _validatePassword(password1: string, password2: string) {
    return await bcrypt.compare(password1, password2);
  }
}
