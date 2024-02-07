import { ValueObject } from 'src/shared/domain/valueObject.base';
import { UserId } from '../../user/valueObjects/userId.valueObject';
import { GroupId } from './groupId.valueObject';

export class GroupOwnerId extends ValueObject<{
  userId: UserId;
  groupId: GroupId;
}> {
  protected assert(value: { userId: UserId; groupId: GroupId }): void {
    //
  }
}
