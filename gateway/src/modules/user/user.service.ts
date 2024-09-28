import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetUserParamDto } from './dto/get-user-param.dto';
import { UpdateUserBodyDto } from './dto/update-user-body.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('user_mq') private readonly rabbitMqClient: ClientProxy,
  ) {}

  async getUser(params: GetUserParamDto) {
    return this.rabbitMqClient.send('get_user', params).toPromise();
  }

  async updateUser(params: GetUserParamDto, body: UpdateUserBodyDto) {
    return this.rabbitMqClient.send('update_user', { params, body });
  }
}
