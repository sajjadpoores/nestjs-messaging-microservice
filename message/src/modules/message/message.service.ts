import { Injectable } from '@nestjs/common';
import { CreateMessageBodyDto } from './dto/create-message-body.dto';
import { MessageEntity } from 'src/shared/entity/message.entity';
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from 'crypto';
import { MessageRepository } from 'src/shared/repository/message.repository';
import { FileEntity } from 'src/shared/entity/file.entity';
import { FileRepository } from 'src/shared/repository/file.repository';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { GetMessagesQueryBody } from './dto/get-messages-query.dto';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly fileRepository: FileRepository,
  ) {}

  async sendMessage(
    createMessageDto: CreateMessageBodyDto,
    files: Array<Express.Multer.File>,
  ): Promise<MessageEntity> {
    const { sender, reciever, text } = createMessageDto;

    // Generate a consistent encryption key based on the sender and receiver
    const key = this._generateEncryptionKey(sender, reciever);
    const iv = randomBytes(16);

    let encryptedText = this._encryptMessage(key, iv, text);

    const message = this.messageRepository.create({
      sender,
      reciever,
      text: encryptedText,
      iv: iv.toString('hex'),
    });

    if (files && files.length > 0) {
      const fileEntities = await this._uploadFiles(files);
      message.files = fileEntities;
    }

    return this.messageRepository.save(message);
  }

  async getChatMessages(
    query: PaginationQueryDto,
    param: GetMessagesQueryBody,
  ): Promise<{ data: MessageEntity[]; total: number }> {
    const { sender, reciever } = param;
    const { page, limit } = query;

    const skip = (page - 1) * limit;
    const [data, total] = await this.messageRepository.findAndCount({
      where: [
        { sender, reciever },
        { sender: reciever, reciever: sender },
      ],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take: limit,
    });

    const decryptedData = data.map((message) => {
      const decryptedText = this._decryptMessage(
        message.text,
        message.iv,
        message.sender,
        message.reciever,
      );
      return {
        ...message,
        text: decryptedText,
      };
    });

    return { data: decryptedData, total };
  }

  private _encryptMessage(key: Buffer, iv: Buffer, text: string) {
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encryptedText = cipher.update(text, 'utf8', 'hex');
    encryptedText += cipher.final('hex');
    return encryptedText;
  }

  private _decryptMessage(
    encryptedText: string,
    ivHex: string,
    sender: number,
    receiver: number,
  ): string {
    const key = this._generateEncryptionKey(sender, receiver);
    const iv = Buffer.from(ivHex, 'hex'); // Convert stored IV back to Buffer

    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    let decryptedText = decipher.update(encryptedText, 'hex', 'utf8');
    decryptedText += decipher.final('utf8');

    return decryptedText;
  }

  private _generateEncryptionKey(sender: number, receiver: number): Buffer {
    const keyString = `${sender}-${receiver}`;
    return createHash('sha256').update(keyString).digest();
  }

  private async _uploadFiles(
    files: Array<Express.Multer.File>,
  ): Promise<FileEntity[]> {
    const fileEntities: FileEntity[] = [];

    for (const file of files) {
      const fileEntity = this.fileRepository.create({
        url: file.path,
      });
      await this.fileRepository.save(fileEntity);
      fileEntities.push(fileEntity);
    }

    return fileEntities;
  }
}
