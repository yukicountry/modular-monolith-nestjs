import {
  DOMAIN_EVENT_DISPATCHER,
  DomainEventDispatcher,
} from 'src/shared/application/domainEvent.dispatcher';
import { UserCounter } from '../../../domain/userRegistration/userCounter';
import { UserRegistration } from '../../../domain/userRegistration/userRegistration.entity';
import {
  USER_REGISTRATION_REPOSITORY,
  UserRegistrationRepository,
} from '../../../domain/userRegistration/userRegistration.repository';
import { RegisterNewUserCommand } from './registerNewUser.command';
import { Inject } from '@nestjs/common';
import { USER_COUNTER } from '../../../infra/config/identity.diTokens';
import { BadCommandError } from 'src/shared/application/badCommand.error';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result, ok } from 'neverthrow';
import { UserRegistrationId } from 'src/modules/identity/domain/userRegistration/valueObjects/userRegistrationId.valueObject';
import { UnitOfWork } from 'src/shared/infra/unitOfWork/unitOfWork.decorator';

@CommandHandler(RegisterNewUserCommand)
export class RegisterNewUserCommandHandler
  implements
    ICommandHandler<
      RegisterNewUserCommand,
      Result<UserRegistrationId, BadCommandError>
    >
{
  constructor(
    @Inject(DOMAIN_EVENT_DISPATCHER)
    private readonly eventDispatcher: DomainEventDispatcher,

    @Inject(USER_REGISTRATION_REPOSITORY)
    private readonly userRegistrationRepo: UserRegistrationRepository,

    @Inject(USER_COUNTER)
    private readonly userCounter: UserCounter,
  ) {}

  @UnitOfWork
  async execute(
    command: RegisterNewUserCommand,
  ): Promise<Result<UserRegistrationId, BadCommandError>> {
    const userRegistration = await UserRegistration.registerNewUser({
      rawPassword: command.props.rawPassword,
      email: command.props.email,
      userCounter: this.userCounter,
    });

    await this.userRegistrationRepo.save(userRegistration);
    await this.eventDispatcher.dispatchEvents(userRegistration.events);

    return ok(userRegistration.id);
  }
}
