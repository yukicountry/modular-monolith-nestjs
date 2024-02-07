import { UserId } from 'src/modules/identity/domain/user/valueObjects/userId.valueObject';
import { CreateUserCommand } from './createUser.command';
import {
  USER_REGISTRATION_REPOSITORY,
  UserRegistrationRepository,
} from 'src/modules/identity/domain/userRegistration/userRegistration.repository';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/identity/domain/user/user.repository';
import { UserRegistrationId } from 'src/modules/identity/domain/userRegistration/valueObjects/userRegistrationId.valueObject';
import { UserCounter } from 'src/modules/identity/domain/userRegistration/userCounter';
import {
  DOMAIN_EVENT_DISPATCHER,
  DomainEventDispatcher,
} from 'src/shared/application/domainEvent.dispatcher';
import { UserRegistrationNotFoundError } from './createUser.error';
import { Inject } from '@nestjs/common';
import { USER_COUNTER } from 'src/modules/identity/infra/config/identity.diTokens';

export class CreateUserCommandHandler {
  constructor(
    @Inject(USER_REGISTRATION_REPOSITORY)
    private readonly userRegistrationRepo: UserRegistrationRepository,

    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,

    @Inject(USER_COUNTER)
    private readonly userCounter: UserCounter,

    @Inject(DOMAIN_EVENT_DISPATCHER)
    private readonly eventDispatcher: DomainEventDispatcher,
  ) {}

  async handle(command: CreateUserCommand): Promise<UserId> {
    const userRegistration = await this.userRegistrationRepo.findById(
      new UserRegistrationId(command.props.userRegistrationId),
    );

    if (userRegistration == null) {
      throw new UserRegistrationNotFoundError(
        `User registration of id ${command.props.userRegistrationId} is not found.`,
      );
    }

    const user = await userRegistration.createUser({
      userName: command.props.userName,
      userCounter: this.userCounter,
    });

    await Promise.all([
      this.userRepo.save(user),
      this.eventDispatcher.dispatchEvents(user.events),
    ]);

    return user.id;
  }
}
