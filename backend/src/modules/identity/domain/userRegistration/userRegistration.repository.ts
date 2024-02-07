import { UserRegistration } from './userRegistration.entity';
import { UserRegistrationId } from './valueObjects/userRegistrationId.valueObject';

export interface UserRegistrationRepository {
  findById(id: UserRegistrationId): Promise<UserRegistration | undefined>;

  save(userRegistration: UserRegistration): Promise<void>;
}

export const USER_REGISTRATION_REPOSITORY = Symbol(
  'USER_REGISTRATION_REPOSITORY',
);
