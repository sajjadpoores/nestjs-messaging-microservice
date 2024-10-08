import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetMessagesParamsDto {
  @ApiProperty({ description: 'ID of the receiver', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  receiver: number;
}
