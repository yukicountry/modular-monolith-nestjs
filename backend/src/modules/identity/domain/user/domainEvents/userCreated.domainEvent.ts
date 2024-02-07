import { DomainEvent } from 'src/shared/domain/domainEvent.base';
import { UserId } from '../valueObjects/userId.valueObject';

type UserCreatedProps = {
  userId: UserId;
  email: string;
  userName: string;
};

export class UserCreated extends DomainEvent<UserCreatedProps> {
  static EVENT_VERSION = 1;
  static EVENT_TYPE = 'identity.userCreated';

  getCurrentVersion(): number {
    return UserCreated.EVENT_VERSION;
  }

  getType(): string {
    return UserCreated.EVENT_TYPE;
  }
}
