import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { FileRepository } from 'src/shared/repository/file.repository';
import { MessageRepository } from 'src/shared/repository/message.repository';

@Module({
  controllers: [MessageController],
  providers: [MessageService, FileRepository, MessageRepository],
})
export class MessageModule {}
