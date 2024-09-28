import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @MessagePattern('send_message')
  async handleSendMessage(@Payload() data: any) {
    const { body, files } = data;
    return this.messageService.sendMessage(body, files);
  }

  @MessagePattern('get_messages')
  async getMessages(@Payload() data: any) {
    const { query, params } = data;
    return this.messageService.getChatMessages(query, params);
  }
}
