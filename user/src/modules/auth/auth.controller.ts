import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserBodyDto } from './dto/register-user-body.dto';
import { LoginUserBodyDto } from './dto/login-user.body.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @MessagePattern('register_user')
  async register(@Payload() data: RegisterUserBodyDto) {
    return this.authService.register(data);
  }

  @MessagePattern('login_user')
  async login(@Payload() body: LoginUserBodyDto) {
    return this.authService.login(body);
  }
}
