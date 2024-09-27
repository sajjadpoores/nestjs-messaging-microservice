import { Controller, Get, Param } from '@nestjs/common';
import { RequestService } from '../request/request.service';
import { GetUserParamDto } from './dto/get-user-param.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly requestService: RequestService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user detail' })
  async getUser(@Param() params: GetUserParamDto) {
    return this.requestService.get('http://localhost:3000/user/' + params.id);
  }
}
