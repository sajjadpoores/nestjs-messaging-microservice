import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { FileRepository } from 'src/shared/repository/file.repository';
import { MessageRepository } from 'src/shared/repository/message.repository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  // imports: [
  //   MulterModule.register({
  //     dest: './uploads',
  //   }),
  // ],
  controllers: [MessageController],
  providers: [MessageService, FileRepository, MessageRepository],
})
export class MessageModule {}
