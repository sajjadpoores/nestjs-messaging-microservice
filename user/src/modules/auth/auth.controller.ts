import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserBodyDto } from './dto/register-user-body.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserBodyDto } from './dto/login-user.body.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'register a new user' })
  async register(@Body() body: RegisterUserBodyDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'login user' })
  async login(@Body() body: LoginUserBodyDto) {
    return this.authService.login(body);
  }
}
