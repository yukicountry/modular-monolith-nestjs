import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
