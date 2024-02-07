import { UserCounter } from '../userCounter';
import { EmailDuplicatedError } from '../userRegistration.error';

export class EmailMustBeUniqueRule {
  async check(userCounter: UserCounter, email: string): Promise<void> {
    const userCount = await userCounter.countNonDeletedUsersWithEmail(email);

    if (userCount >= 1) {
      throw new EmailDuplicatedError('Email must be unique.');
    }
  }
}
