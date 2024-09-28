import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserBodyDto } from './dto/register-user-body.dto';
import { LoginUserBodyDto } from './dto/login-user.body.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from 'src/shared/decorator/is-public.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Register a new user' })
  async registerUser(@Body() body: RegisterUserBodyDto) {
    return this.authService.registerUser(body);
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Login user' })
  async loginUser(@Body() body: LoginUserBodyDto) {
    return this.authService.loginUser(body);
  }
}
