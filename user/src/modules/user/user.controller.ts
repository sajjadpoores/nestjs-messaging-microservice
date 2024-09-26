import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserParamDto } from './dto/get-user-param.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserBodyDto } from './dto/update-user-body.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param() params: GetUserParamDto) {
    return this.userService.getUser(params.id);
  }

  @Put(':id')
  async updateUser(
    @Param() params: GetUserParamDto,
    @Body() body: UpdateUserBodyDto,
  ) {
    return this.userService.updateUser(params.id, body);
  }
}
