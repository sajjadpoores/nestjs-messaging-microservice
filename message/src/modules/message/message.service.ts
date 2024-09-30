import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMessageBodyDto } from './dto/create-message-body.dto';
import { MessageEntity } from 'src/shared/entity/message.entity';
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from 'crypto';
import { MessageRepository } from '../../shared/repository/message.repository';
import { FileEntity } from 'src/shared/entity/file.entity';
import { FileRepository } from '../../shared/repository/file.repository';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { GetMessagesParamDto } from './dto/get-messages-param.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly fileRepository: FileRepository,
  ) {}

  async sendMessage(
    createMessageDto: CreateMessageBodyDto,
    files: Array<{
      originalname: string;
      mimetype: string;
      encoding: string;
      content: string;
    }>,
  ): Promise<MessageEntity> {
    const { sender, receiver, text } = createMessageDto;

    // Generate a consistent encryption key based on the sender and receiver
    const key = this._generateEncryptionKey(sender, receiver);
    const iv = randomBytes(16);

    const encryptedText = this._encryptMessage(key, iv, text);

    const message = this.messageRepository.create({
      sender,
      receiver,
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
    param: GetMessagesParamDto,
  ): Promise<{ data: Partial<MessageEntity>[]; total: number }> {
    const { sender, receiver } = param;
    const { page, limit } = query;

    const skip = (page - 1) * limit;
    const [data, total] = await this.messageRepository.getMessages(
      sender,
      receiver,
      skip,
      limit,
    );

    const decryptedData = data.map((message) => {
      const decryptedText = this._decryptMessage(
        message.text,
        message.iv,
        message.sender,
        message.receiver,
      );

      return {
        id: message.id,
        sender: message.sender,
        receiver: message.receiver,
        createdAt: message.createdAt,
        text: decryptedText,
        files: message.files,
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
    files: Array<{
      originalname: string;
      mimetype: string;
      encoding: string;
      content: string;
    }>,
  ): Promise<FileEntity[]> {
    const fileEntities: FileEntity[] = [];
    const uploadDir = path.resolve(__dirname, '..', '..', 'uploads');

    // Ensure the upload directory exists, create it if not
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log(`Created upload directory: ${uploadDir}`);
    }

    for (const file of files) {
      const targetPath = path.resolve(
        __dirname,
        '..',
        '..',
        'uploads',
        file.originalname,
      );

      try {
        // Decode base64 content and save it
        const fileBuffer = Buffer.from(file.content, 'base64');
        fs.writeFileSync(targetPath, fileBuffer);

        // Store the file information in the database
        const fileEntity = this.fileRepository.create({
          url: targetPath,
        });
        await this.fileRepository.save(fileEntity);
        fileEntities.push(fileEntity);
      } catch (err) {
        console.error(
          `Failed to save file ${file.originalname} to ${targetPath}:`,
          err,
        );
        throw new InternalServerErrorException('Failed to save file');
      }
    }

    return fileEntities;
  }
}
