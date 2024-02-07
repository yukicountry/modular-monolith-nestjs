import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedDto {
  @ApiProperty({ enum: [401] })
  statusCode: number;

  @ApiProperty()
  message: string;
}
