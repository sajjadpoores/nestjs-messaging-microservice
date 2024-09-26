import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/shared/repository/user.repository';

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
}
