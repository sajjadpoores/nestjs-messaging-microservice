import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/shared/repository/user.repository';
import { UpdateUserBodyDto } from './dto/update-user-body.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User doesn't exist!");
    }

    return {
      id: user.id,
      username: user.username,
      name: user.name,
    };
  }

  async updateUser(userId: number, body: UpdateUserBodyDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User doesn't exist!");
    }

    user.name = body.name || user.name;
    user.username = body.username || user.name;
    if (body.password) {
      const password = await bcrypt.hash(body.password, 10);
      user.password = password;
    }

    await user.save();
    return { message: 'User updated successfully', user };
  }
}
