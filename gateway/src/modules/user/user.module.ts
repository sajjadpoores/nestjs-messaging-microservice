import { Module } from '@nestjs/common';
import { RequestModule } from '../request/request.module';
import { UserController } from './user.controller';

@Module({
  imports: [RequestModule],
  controllers: [UserController],
})
export class UserModule {}
