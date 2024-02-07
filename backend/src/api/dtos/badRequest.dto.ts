import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponseDto {
  @ApiProperty({ enum: [400] })
  statusCode: number;

  @ApiProperty()
  message: string;
}
