import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserParamDto } from './dto/get-user-param.dto';
import { UpdateUserBodyDto } from './dto/update-user-body.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_user')
  async getUser(@Payload() data: GetUserParamDto) {
    return this.userService.getUser(data.id);
  }

  @MessagePattern('update_user')
  async updateUser(
    @Payload() data: { params: GetUserParamDto; body: UpdateUserBodyDto },
  ) {
    return this.userService.updateUser(data.params.id, data.body);
  }
}
