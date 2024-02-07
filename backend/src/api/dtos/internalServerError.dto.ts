import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorDto {
  @ApiProperty({ enum: [500] })
  statusCode: number;

  @ApiProperty()
  message: string;
}
