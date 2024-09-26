import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserBodyDto } from './dto/register-user-body.dto';
import { UserRepository } from 'src/shared/repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(body: RegisterUserBodyDto) {
    const existingUser = await this.userRepository.findOne({
      where: { username: body.username },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const password = await bcrypt.hash(body.password, 10);
    const newUser = await this.userRepository.save({
      username: body.username,
      password,
      name: body.name,
    });

    return { message: 'User registered successfully', user: newUser };
  }
}
