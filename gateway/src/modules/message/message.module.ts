import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { ClientsModule } from '@nestjs/microservices';
import { MessageService } from './message.service';
import { ConfigService } from '@nestjs/config';
import { RabbitMqClientService } from 'src/config/rabbitmq-client.config';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          useFactory: async (configService: ConfigService) =>
            new RabbitMqClientService(
              configService,
              'message_queue',
            ).createClientOptions(),
          inject: [ConfigService],
          name: 'message_mq',
        },
      ],
    }),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
