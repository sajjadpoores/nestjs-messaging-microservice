import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MessageEntity } from '../entity/message.entity';

@Injectable()
export class MessageRepository extends Repository<MessageEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(MessageEntity, dataSource.createEntityManager());
  }
}
