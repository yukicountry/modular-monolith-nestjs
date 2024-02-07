import { UserRegistrationExpiredError } from '../userRegistration.error';

export class UserRegistrationMustNotBeExpiredRule {
  static check(expiredAt: Date) {
    if (expiredAt < new Date()) {
      throw new UserRegistrationExpiredError('User registration is expired');
    }
  }
}
