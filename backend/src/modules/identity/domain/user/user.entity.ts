import { AggregateRoot } from 'src/shared/domain/aggregateRoot.base';
import { UserId } from './valueObjects/userId.valueObject';
import { UserRegistrationId } from '../userRegistration/valueObjects/userRegistrationId.valueObject';
import { UserCreated } from './domainEvents/userCreated.domainEvent';

type CreateUserFromRegistrationParams = Omit<UserProps, 'deletedAt'> & {
  userRegistrationId: UserRegistrationId;
};

type UserProps = {
  email: string;
  hashedPassword: string;
  userName: string;
  deletedAt: Date | undefined;
};

export class User extends AggregateRoot<UserId, UserProps> {
  static createUserFromRegistration(
    params: CreateUserFromRegistrationParams,
  ): User {
    const user = new User({
      id: new UserId(params.userRegistrationId.value),
      props: {
        email: params.email,
        hashedPassword: params.hashedPassword,
        userName: params.userName,
        deletedAt: undefined,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    user.addEvent(
      new UserCreated({
        detail: {
          userId: user.id,
          email: user.props.email,
          userName: user.props.userName,
        },
      }),
    );

    return user;
  }
}
