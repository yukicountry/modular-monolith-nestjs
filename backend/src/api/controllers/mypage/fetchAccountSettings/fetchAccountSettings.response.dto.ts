import { ApiProperty } from '@nestjs/swagger';

export class FetchAccountSettingsResponseDto {
  @ApiProperty({ description: 'ユーザ名' })
  readonly userName: string;

  @ApiProperty({ description: 'メールアドレス' })
  readonly email: string;

  constructor(userName: string, email: string) {
    this.userName = userName;
    this.email = email;
  }
}
