import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageBodyDto } from './dto/create-message-body.dto';
import * as fs from 'fs';
import { GetMessagesParamsDto } from './dto/get-messages-params.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessageService {
  constructor(
    @Inject('message_mq') private readonly rabbitMqClient: ClientProxy,
  ) {}

  async sendMessage(
    body: CreateMessageBodyDto,
    files: Array<Express.Multer.File>,
  ) {
    // Encode files as base64
    const fileData = files.map((file) => {
      const filePath = file.path;
      const fileContent = fs.readFileSync(filePath);
      const fileBase64 = fileContent.toString('base64');
      return {
        originalname: file.originalname,
        mimetype: file.mimetype,
        encoding: file.encoding,
        content: fileBase64,
      };
    });

    const messageData = {
      body,
      files: fileData,
    };

    // Send the message and files via RabbitMQ
    await this.rabbitMqClient.send('send_message', messageData).toPromise();

    // Remove files after sending the message
    files.forEach((file) => {
      try {
        fs.unlinkSync(file.path);
        console.log(`File ${file.path} removed from gateway storage.`);
      } catch (err) {
        console.error(`Failed to remove file ${file.path}:`, err);
      }
    });

    return { success: true };
  }

  async getMessages(query: PaginationQueryDto, params: GetMessagesParamsDto) {
    const messageData = {
      query,
      params,
    };
    return this.rabbitMqClient.send('get_messages', messageData);
  }
}
