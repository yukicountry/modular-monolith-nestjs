import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenDto {
  @ApiProperty({ enum: [403] })
  statusCode: number;

  @ApiProperty()
  message: string;
}
