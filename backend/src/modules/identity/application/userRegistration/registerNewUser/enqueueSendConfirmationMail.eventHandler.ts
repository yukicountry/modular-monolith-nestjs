import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NewUserRegistered } from 'src/modules/identity/domain/userRegistration/domainEvents/newUserRegistered.domainEvent';
import {
  COMMAND_ENQUEUER,
  CommandEnqueuer,
} from 'src/shared/application/commands/commandEnqueuer';
import { SendConfirmationMailCommand } from '../sendConfirmationMail/sendConfirmationMail.command';

export class EnqueueSendConfirmationMailEventHandler {
  constructor(
    @Inject(COMMAND_ENQUEUER) private readonly commandEnqueuer: CommandEnqueuer,
  ) {}

  @OnEvent(NewUserRegistered.EVENT_TYPE)
  async handle(event: NewUserRegistered): Promise<void> {
    console.log('EnqueueSendConfirmationMailEventHandler');

    this.commandEnqueuer.enqueue(
      new SendConfirmationMailCommand({
        props: {
          userRegistrationId: event.detail.userRegistrationId,
          email: event.detail.email,
        },
      }),
    );
  }
}
