import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { generateDestination } from 'src/shared/util/generate-destination.function';
import { generateFileName } from 'src/shared/util/generate-file-name.function';

export function sendMessageMultiPartDecorators() {
  return applyDecorators(
    UseInterceptors(
      FilesInterceptor('files', 10, {
        storage: diskStorage({
          destination: generateDestination,
          filename: generateFileName,
        }),
      }),
    ),
    ApiBody({
      description: 'Message details with file uploads',
      required: true,
      schema: {
        type: 'object',
        properties: {
          sender: { type: 'integer', description: 'ID of the sender' },
          receiver: { type: 'integer', description: 'ID of the receiver' },
          text: { type: 'string', description: 'Text message content' },
          files: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
            description: 'Array of files to upload',
          },
        },
      },
    }),
    ApiConsumes('multipart/form-data'),
  );
}
