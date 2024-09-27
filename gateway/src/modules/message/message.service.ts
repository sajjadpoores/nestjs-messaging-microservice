import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestService } from '../request/request.service';
import { CreateMessageBodyDto } from './dto/create-message-body.dto';
import * as FormData from 'form-data';
import * as path from 'path';
import * as fs from 'fs';
import { GetMessagesParamsDto } from './dto/get-messages-params.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';

@Injectable()
export class MessageService {
  constructor(private readonly requestService: RequestService) {}

  async sendMessage(
    body: CreateMessageBodyDto,
    files: Array<Express.Multer.File>,
  ) {
    const formData = new FormData();

    formData.append('sender', body.sender.toString());
    formData.append('receiver', body.receiver.toString());
    formData.append('text', body.text);

    if (files && files.length > 0) {
      for (const file of files) {
        const filePath = path.resolve(
          __dirname,
          '..',
          '..',
          'uploads',
          file.filename,
        );
        if (!fs.existsSync(filePath)) {
          throw new NotFoundException(`File not found: ${filePath}`);
        }
        const stream = fs.createReadStream(filePath);
        formData.append('files', stream, {
          filename: file.originalname,
          contentType: file.mimetype,
        });
      }
    }
    return this.requestService.postFormData(
      'http://localhost:3003/message/send',
      formData,
    );
  }

  async getMessages(query: PaginationQueryDto, params: GetMessagesParamsDto) {
    return this.requestService.get(
      `http://localhost:3003/message/${params.sender}/${params.receiver}`,
      query,
    );
  }
}
