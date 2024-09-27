import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserBodyDto } from './dto/register-user-body.dto';
import { RequestService } from '../request/request.service';
import { LoginUserBodyDto } from './dto/login-user.body.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly requestService: RequestService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async registerUser(@Body() body: RegisterUserBodyDto) {
    return this.requestService.post(
      'http://localhost:3000/auth/register',
      body,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async loginUser(@Body() body: LoginUserBodyDto) {
    return this.requestService.post('http://localhost:3000/auth/login', body);
  }
}
