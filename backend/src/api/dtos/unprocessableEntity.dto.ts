import { ApiProperty } from '@nestjs/swagger';

export class UnprocessableEntityDto {
  @ApiProperty({ enum: [422] })
  statusCode: number;

  @ApiProperty()
  message: UnprocessableEntityItemDto[];
}

export class UnprocessableEntityItemDto {
  @ApiProperty()
  property: string;

  @ApiProperty()
  message: string;
}
