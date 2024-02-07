import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupResponseDto {
  @ApiProperty({
    description: 'グループID',
  })
  groupId: string;

  constructor(groupId: string) {
    this.groupId = groupId;
  }
}
