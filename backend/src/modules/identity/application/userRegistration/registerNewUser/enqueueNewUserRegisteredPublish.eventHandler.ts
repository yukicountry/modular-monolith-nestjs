import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NewUserRegistered } from 'src/modules/identity/domain/userRegistration/domainEvents/newUserRegistered.domainEvent';
import {
  COMMAND_ENQUEUER,
  CommandEnqueuer,
} from 'src/shared/application/commands/commandEnqueuer';

export class EnqueueNewUserRegisteredPublishEventHandler {
  constructor(
    @Inject(COMMAND_ENQUEUER) private readonly enqueuer: CommandEnqueuer,
  ) {}

  @OnEvent(NewUserRegistered.EVENT_TYPE)
  async handle(event: NewUserRegistered): Promise<void> {
    console.log('EnqueueNewUserRegisteredPublishEventHandler');
  }
}
