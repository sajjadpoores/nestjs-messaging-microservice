import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule } from '@nestjs/microservices';
import { RabbitMqClientService } from 'src/config/rabbitmq-client.config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          useFactory: async (configService: ConfigService) =>
            new RabbitMqClientService(
              configService,
              'user_queue',
            ).createClientOptions(),
          inject: [ConfigService],
          name: 'auth_mq',
        },
      ],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  constructor() {
    console.log('Here');
  }
}
