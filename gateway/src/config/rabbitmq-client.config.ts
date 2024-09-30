import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModuleOptionsFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitMqClientService implements ClientsModuleOptionsFactory {
  // @Inject(ConfigService)
  // private readonly config: ConfigService;

  constructor(
    private readonly config: ConfigService,
    private readonly queueName: string,
  ) {} // Accept queue name as a parameter

  public createClientOptions(): ClientProvider {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.config.get<string>('RABBITMQ_URL')],
        queue: this.queueName,
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}
