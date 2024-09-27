import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { RequestService } from '../request/request.service';
import { GetUserParamDto } from './dto/get-user-param.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateUserBodyDto } from './dto/update-user-body.dto';

@Controller('user')
export class UserController {
  constructor(private readonly requestService: RequestService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user detail' })
  async getUser(@Param() params: GetUserParamDto) {
    return this.requestService.get('http://localhost:3000/user/' + params.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user info' })
  async updateUser(
    @Param() params: GetUserParamDto,
    @Body() body: UpdateUserBodyDto,
  ) {
    return this.requestService.put(
      'http://localhost:3000/user/' + params.id,
      body,
    );
  }
}
