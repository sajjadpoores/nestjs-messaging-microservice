import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserParamDto } from './dto/get-user-param.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param() params: GetUserParamDto) {
    return this.userService.getUser(params.id);
  }
}
