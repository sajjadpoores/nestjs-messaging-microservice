import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { GetUserParamDto } from './dto/get-user-param.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateUserBodyDto } from './dto/update-user-body.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user detail' })
  async getUser(@Param() params: GetUserParamDto) {
    return this.userService.getUser(params);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user info' })
  async updateUser(
    @Param() params: GetUserParamDto,
    @Body() body: UpdateUserBodyDto,
  ) {
    return this.userService.updateUser(params, body);
  }
}
