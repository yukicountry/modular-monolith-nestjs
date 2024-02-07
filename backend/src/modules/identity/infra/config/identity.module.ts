import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { db } from 'src/database/database';
import { COMMAND_ENQUEUER } from 'src/shared/application/commands/commandEnqueuer';
import { DOMAIN_EVENT_DISPATCHER } from 'src/shared/application/domainEvent.dispatcher';
import { OUTBOX } from 'src/shared/application/outbox/outbox';
import { DefaultDomainEventDispatcher } from 'src/shared/infra/domainEvent/domainEventDispatcher.default';
import { UnitOfWorkModule } from 'src/shared/infra/unitOfWork/unitOfWork.module';
import { AuthenticateCommandHandler } from '../../application/authentication/authenticate/authenticate.commandHandler';
import { CreateUserCommandHandler } from '../../application/user/createUser/createUser.commandHandler';
import { EnqueueNewUserRegisteredPublishEventHandler } from '../../application/userRegistration/registerNewUser/enqueueNewUserRegisteredPublish.eventHandler';
import { EnqueueSendConfirmationMailEventHandler } from '../../application/userRegistration/registerNewUser/enqueueSendConfirmationMail.eventHandler';
import { RegisterNewUserCommandHandler } from '../../application/userRegistration/registerNewUser/registerNewUser.commandHandler';
import { SendConfirmationMailCommandHandler } from '../../application/userRegistration/sendConfirmationMail/sendConfirmationMail.commandHandler';
import { USER_REPOSITORY } from '../../domain/user/user.repository';
import { USER_REGISTRATION_REPOSITORY } from '../../domain/userRegistration/userRegistration.repository';
import { MySqlCommandEnqueuer } from '../commands/commandEnqueuer.mysql';
import { ProcessQueuedCommandsCommandHandler } from '../commands/processInternalCommands.commandHandler';
import { MySqlUserRepository } from '../domain/user/user.repository.mysql';
import { MySqlUserCounter } from '../domain/userRegistration/userCounter.mysql';
import { MySqlUserRegistrationRepository } from '../domain/userRegistration/userRegistration.repository.mysql';
import { MySqlOutbox } from '../outbox/outbox.mysql';
import { ProcessOutboxCommandHandler } from '../outbox/processOutbox.commandHandler';
import { USER_COUNTER } from './identity.diTokens';
import { GetUserQueryHandler } from '../../application/user/getUser/getUser.queryHandler';

const commandHandlers = [
  RegisterNewUserCommandHandler,
  CreateUserCommandHandler,
  ProcessOutboxCommandHandler,
  ProcessQueuedCommandsCommandHandler,
  SendConfirmationMailCommandHandler,
  AuthenticateCommandHandler,
];

const queryHandlers = [GetUserQueryHandler];

const eventHandlers = [
  EnqueueNewUserRegisteredPublishEventHandler,
  EnqueueSendConfirmationMailEventHandler,
];

const repositories: Provider[] = [
  {
    provide: USER_REGISTRATION_REPOSITORY,
    useClass: MySqlUserRegistrationRepository,
  },
  { provide: USER_REPOSITORY, useClass: MySqlUserRepository },
];

const etc: Provider[] = [
  {
    provide: USER_COUNTER,
    useClass: MySqlUserCounter,
  },
  {
    provide: DOMAIN_EVENT_DISPATCHER,
    useClass: DefaultDomainEventDispatcher,
  },
  {
    provide: 'DB',
    useValue: db,
  },
  {
    provide: OUTBOX,
    useClass: MySqlOutbox,
  },
  //   Scheduler,
  {
    provide: COMMAND_ENQUEUER,
    useClass: MySqlCommandEnqueuer,
  },
];

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'mailpit',
        port: 1025,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      preview: true,
      template: {
        dir:
          process.cwd() + '/src/modules/identity/application/mail/templates/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    CqrsModule,
    UnitOfWorkModule,
  ],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...repositories,
    ...etc,
  ],
  exports: [...commandHandlers, ...queryHandlers],
})
export class IdentityModule {}
