import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateGroupRequestDto {
  @ApiProperty({
    description: 'グループ名',
  })
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: '詳細',
  })
  @IsNotEmpty()
  @MaxLength(5000)
  description: string;
}
