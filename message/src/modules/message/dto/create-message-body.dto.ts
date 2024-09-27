import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateMessageBodyDto {
  @ApiProperty({ description: 'ID of the sender', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  sender: number;

  @ApiProperty({ description: 'ID of the receiver', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  receiver: number;

  @ApiProperty({ description: 'Message text', example: 'Hello!' })
  @IsOptional()
  @IsString()
  text: string;
}
