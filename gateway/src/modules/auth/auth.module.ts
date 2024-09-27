import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RequestModule } from '../request/request.module';

@Module({
  imports: [RequestModule],
  controllers: [AuthController],
})
export class AuthModule {}
