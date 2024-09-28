import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { GetUserParamDto } from './dto/get-user-param.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserBodyDto } from './dto/update-user-body.dto';
import { UserService } from './user.service';
import { IsAdmin } from 'src/shared/decorator/is-admin.decorator';
import { GetUser } from 'src/shared/decorator/get-user.decorator';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiOperation({ summary: 'Get authorized user detail' })
  async getMe(@GetUser() user) {
    return this.userService.getUser({ id: user?.id });
  }

  @Get(':id')
  @IsAdmin()
  @ApiOperation({ summary: 'Get user detail' })
  async getUser(@Param() params: GetUserParamDto) {
    return this.userService.getUser(params);
  }

  @Put(':id')
  @IsAdmin()
  @ApiOperation({ summary: 'Update a user info' })
  async updateUser(
    @Param() params: GetUserParamDto,
    @Body() body: UpdateUserBodyDto,
  ) {
    return this.userService.updateUser(params, body);
  }
}
