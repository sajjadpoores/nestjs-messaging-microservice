import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateMessageBodyDto } from './dto/create-message-body.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { GetMessagesParamsDto } from './dto/get-messages-params.dto';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MessageService } from './message.service';

@Controller('message')
@ApiTags('Message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a message with optional files' })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.resolve(__dirname, '..', '..', 'uploads');
          // Ensure the directory exists, if not create it
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath); // Save to absolute path
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  @ApiBody({
    description: 'Message details with file uploads',
    required: true,
    schema: {
      type: 'object',
      properties: {
        sender: { type: 'integer', description: 'ID of the sender' },
        receiver: { type: 'integer', description: 'ID of the receiver' },
        text: { type: 'string', description: 'Text message content' },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'Array of files to upload',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async sendMessage(
    @Body() body: CreateMessageBodyDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.messageService.sendMessage(body, files);
  }

  @Get(':sender/:receiver')
  @ApiOperation({ summary: 'Get paginated list of messages' })
  async getMessages(
    @Query() query: PaginationQueryDto,
    @Param() params: GetMessagesParamsDto,
  ) {
    return this.messageService.getMessages(query, params);
  }
}
