import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetMessagesQueryBody {
  @ApiProperty({ description: 'ID of the sender', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  sender: number;

  @ApiProperty({ description: 'ID of the receiver', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  receiver: number;
}
