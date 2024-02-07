import { DomainEvent } from 'src/shared/domain/domainEvent.base';

type GroupCreatedProps = {
  groupId: string;
  name: string;
  description?: string;
  creatorId: string;
};

export class GroupCreated extends DomainEvent<GroupCreatedProps> {
  static EVENT_TYPE = 'identity.groupCreated';
  static CURRENT_VERSION = 1;

  getCurrentVersion(): number {
    return GroupCreated.CURRENT_VERSION;
  }

  getType(): string {
    return GroupCreated.EVENT_TYPE;
  }
}
