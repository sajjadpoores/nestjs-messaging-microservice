import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMessageBodyDto } from './dto/create-message-body.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { GetMessagesParamsDto } from './dto/get-messages-params.dto';
import { MessageService } from './message.service';
import { sendMessageMultiPartDecorators } from './decorator/send-message-multi-part.decorator';

@Controller('message')
@ApiTags('Message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a message with optional files' })
  @sendMessageMultiPartDecorators()
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
