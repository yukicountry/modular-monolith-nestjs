import { DomainEvent } from 'src/shared/domain/domainEvent.base';
import { GroupOwnerId } from '../valueObjects/groupOwnerId.valueObject';

type GroupSubOwnerAddedProps = {
  groupOwnerId: GroupOwnerId;
};

export class GroupSubOwnerAdded extends DomainEvent<GroupSubOwnerAddedProps> {
  static EVENT_TYPE = 'event.groupSubOwnerAdded';
  static CURRENT_VERSION = 1;

  getCurrentVersion(): number {
    return GroupSubOwnerAdded.CURRENT_VERSION;
  }

  getType(): string {
    return GroupSubOwnerAdded.EVENT_TYPE;
  }
}
