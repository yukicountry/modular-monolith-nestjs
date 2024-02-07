import { UserRegistrationIsNotConfirmedError } from '../userRegistration.error';

export class UserRegistrationMustBeConfirmedRule {
  check(confirmedAt: Date | undefined | null): void {
    if (confirmedAt == null) {
      throw new UserRegistrationIsNotConfirmedError(
        'User registration must be confirmed.',
      );
    }
  }
}
