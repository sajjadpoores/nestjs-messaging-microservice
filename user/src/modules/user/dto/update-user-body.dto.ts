import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserBodyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(16)
  @ApiProperty({ description: 'username', example: 'user1', required: true })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'name', example: 'user name', required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 5, minUppercase: 1, minSymbols: 1 })
  @ApiProperty({ description: 'password', example: 'Str0ng', required: true })
  password: string;
}
