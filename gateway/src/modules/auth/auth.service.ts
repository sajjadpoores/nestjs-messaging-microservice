import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUserBodyDto } from './dto/register-user-body.dto';
import { LoginUserBodyDto } from './dto/login-user.body.dto';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('auth_mq') private readonly rabbitMqClient: ClientProxy,
  ) {}

  async registerUser(body: RegisterUserBodyDto) {
    return firstValueFrom(
      this.rabbitMqClient.send('register_user', body).pipe(
        catchError((err) => {
          const { message, code } = err;
          console.log(err);
          throw new HttpException(
            message || 'User registration failed',
            code || HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );
  }

  async loginUser(body: LoginUserBodyDto) {
    return firstValueFrom(
      this.rabbitMqClient.send('login_user', body).pipe(
        catchError((err) => {
          const { message, code } = err;
          throw new HttpException(
            message || 'Login failed',
            code || HttpStatus.UNAUTHORIZED,
          );
        }),
      ),
    );
  }
}
