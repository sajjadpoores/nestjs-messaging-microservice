import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MessageEntity } from '../entity/message.entity';

@Injectable()
export class MessageRepository extends Repository<MessageEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(MessageEntity, dataSource.createEntityManager());
  }

  async getMessages(
    sender: number,
    receiver: number,
    skip: number,
    limit: number,
  ) {
    return this.createQueryBuilder('message')
      .leftJoinAndSelect('message.files', 'file')
      .where('message.sender = :sender AND message.receiver = :receiver', {
        sender,
        receiver,
      })
      .orWhere('message.sender = :receiver AND message.receiver = :sender', {
        sender,
        receiver,
      })
      .select([
        'message.id',
        'message.sender',
        'message.receiver',
        'message.text',
        'message.iv',
        'message.createdAt',
        'file.id',
        'file.url',
      ])
      .orderBy('message.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
  }
}
