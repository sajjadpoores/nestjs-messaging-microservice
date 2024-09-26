import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/shared/repository/user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
