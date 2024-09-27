import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Query,
  Get,
  Param,
} from '@nestjs/common';
import { MessageService } from './message.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateMessageBodyDto } from './dto/create-message-body.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { GetMessagesQueryBody } from './dto/get-messages-query.dto';
@Controller('message')
@ApiTags('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a message with optional files' })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      // Accept up to 10 files
      storage: diskStorage({
        destination: './uploads',
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
    @Body() createMessageDto: CreateMessageBodyDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.messageService.sendMessage(createMessageDto, files);
  }

  @Get(':sender/:receiver')
  @ApiOperation({ summary: 'Get paginated list of messages' })
  @ApiResponse({ status: 200, description: 'Messages successfully retrieved.' })
  async getMessages(
    @Query() query: PaginationQueryDto,
    @Param() params: GetMessagesQueryBody,
  ) {
    return this.messageService.getChatMessages(query, params);
  }
}
