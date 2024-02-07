import { UserRegistrationId } from './valueObjects/userRegistrationId.valueObject';
import { UserCounter } from './userCounter';
import { EmailMustBeUniqueRule } from './rules/emailMustBeUnique.rule';
import { PasswordHasher } from './passwordHasher';
import { randomUUID } from 'crypto';
import { AggregateRoot } from 'src/shared/domain/aggregateRoot.base';
import { NewUserRegistered } from './domainEvents/newUserRegistered.domainEvent';
import * as dayjs from 'dayjs';
import { User } from '../user/user.entity';
import { UserRegistrationMustNotBeExpiredRule } from './rules/userRegistrationMustNotBeExpired.rule';
import { UserRegistrationMustBeConfirmedRule } from './rules/userRegistrationMustBeConfirmed.rule';

type UserRegistrationProps = {
  hashedPassword: string;
  email: string;
  confirmedAt?: Date;
  expiresAt: Date;
};

type RegisterNewUserParams = Pick<UserRegistrationProps, 'email'> & {
  rawPassword: string;
  userCounter: UserCounter;
};

type CreateUserParams = {
  userName: string;
  userCounter: UserCounter;
};

export class UserRegistration extends AggregateRoot<
  UserRegistrationId,
  UserRegistrationProps
> {
  static async registerNewUser(
    params: RegisterNewUserParams,
  ): Promise<UserRegistration> {
    await new EmailMustBeUniqueRule().check(params.userCounter, params.email);

    const registration = new UserRegistration({
      id: new UserRegistrationId(randomUUID()),
      props: {
        ...params,
        hashedPassword: new PasswordHasher().makeHash(params.rawPassword),
        confirmedAt: undefined,
        expiresAt: dayjs().add(1, 'day').toDate(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    registration.addEvent(
      new NewUserRegistered({
        detail: {
          userRegistrationId: registration.id.value,
          email: registration.props.email,
        },
      }),
    );

    return registration;
  }

  async createUser(params: CreateUserParams): Promise<User> {
    await new EmailMustBeUniqueRule().check(
      params.userCounter,
      this.props.email,
    );
    UserRegistrationMustNotBeExpiredRule.check(this.props.expiresAt);

    return User.createUserFromRegistration({
      userRegistrationId: this.id,
      hashedPassword: this.props.hashedPassword,
      email: this.props.email,
      userName: params.userName,
    });
  }
}
