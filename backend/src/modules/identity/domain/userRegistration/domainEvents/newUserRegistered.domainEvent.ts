import { DomainEvent } from 'src/shared/domain/domainEvent.base';

type NewUserRegisteredProps = {
  readonly userRegistrationId: string;
  readonly email: string;
};

export class NewUserRegistered extends DomainEvent<NewUserRegisteredProps> {
  static CURRENT_VERSION = 1;

  static EVENT_TYPE = 'identity.newUserRegistered';

  getCurrentVersion(): number {
    return NewUserRegistered.CURRENT_VERSION;
  }

  getType(): string {
    return NewUserRegistered.EVENT_TYPE;
  }

  static fromJSON(obj: any): NewUserRegistered {
    return new NewUserRegistered({
      version: obj.version,
      type: obj.type,
      id: obj.id,
      occurredAt: obj.occurredAt,
      detail: {
        userRegistrationId: obj.detail.userRegistrationId,
        email: obj.detail.email,
      },
    });
  }
}
