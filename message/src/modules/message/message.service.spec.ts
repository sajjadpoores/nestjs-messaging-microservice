/* eslint-disable @typescript-eslint/no-require-imports */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { MessageRepository } from '../../shared/repository/message.repository';
import { FileRepository } from '../../shared/repository/file.repository';
import * as fs from 'fs';
import * as path from 'path';
import { FileEntity } from 'src/shared/entity/file.entity';

describe('MessageService', () => {
  let service: MessageService;
  let messageRepository: MessageRepository;
  let fileRepository: FileRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: MessageRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            getMessages: jest.fn(),
          },
        },
        {
          provide: FileRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<MessageService>(MessageService);
    messageRepository = moduleRef.get<MessageRepository>(MessageRepository);
    fileRepository = moduleRef.get<FileRepository>(FileRepository);
  });

  describe('_generateEncryptionKey', () => {
    it('should generate a enryption key for given sender and receiver', () => {
      const sender = 1;
      const receiver = 2;
      const keyString = `${sender}-${receiver}`;

      // Mock the methods in the createHash chain
      const updateMock = jest.fn().mockReturnThis();
      const digestMock = jest.fn().mockReturnValue(Buffer.from('mockedKey'));

      const createHashMock = jest
        .spyOn(require('crypto'), 'createHash')
        .mockReturnValue({
          update: updateMock,
          digest: digestMock,
        });

      const result = (service as any)._generateEncryptionKey(sender, receiver);

      expect(createHashMock).toHaveBeenCalledWith('sha256');
      expect(updateMock).toHaveBeenCalledWith(keyString);
      expect(digestMock).toHaveBeenCalled();
      expect(result).toEqual(Buffer.from('mockedKey'));

      createHashMock.mockRestore();
    });
  });

  describe('_uploadFiles', () => {
    it('should upload files and save them to the repository', async () => {
      const files = [
        {
          originalname: 'file1.txt',
          mimetype: 'text/plain',
          encoding: '7bit',
          content: 'SGVsbG8gd29ybGQ=', // base64 for "Hello world"
        },
      ];

      const mockFileEntity = new FileEntity();
      jest.spyOn(fs, 'existsSync').mockReturnValue(true); // Mock directory exists
      jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {}); // Mock file write
      jest.spyOn(fileRepository, 'create').mockReturnValue(mockFileEntity);
      jest.spyOn(fileRepository, 'save').mockResolvedValue(mockFileEntity);

      const result = await (service as any)._uploadFiles(files);

      expect(fs.existsSync).toHaveBeenCalledWith(
        expect.stringContaining('uploads'),
      );
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('file1.txt'),
        expect.any(Buffer),
      );
      expect(fileRepository.create).toHaveBeenCalledWith({
        url: expect.stringContaining('file1.txt'),
      });
      expect(fileRepository.save).toHaveBeenCalledWith(mockFileEntity);
      expect(result).toEqual([mockFileEntity]);
    });
  });
});
