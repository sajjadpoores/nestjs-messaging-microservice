import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { RequestModule } from '../request/request.module';
import { MessageService } from './message.service';

@Module({
  imports: [RequestModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
