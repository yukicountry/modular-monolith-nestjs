import { NewUserRegistered } from 'src/modules/identity/domain/userRegistration/domainEvents/newUserRegistered.domainEvent';

export const domainEventMapper = {
  [NewUserRegistered.EVENT_TYPE]: NewUserRegistered.fromJSON,
} as const;
