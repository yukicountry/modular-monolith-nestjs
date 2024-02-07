import { Module, Provider } from '@nestjs/common';
import { CreateGroupCommandHandler } from '../../application/group/createGroup/createGroup.commandHandler';
import { CqrsModule } from '@nestjs/cqrs';
import { UnitOfWorkModule } from 'src/shared/infra/unitOfWork/unitOfWork.module';
import { GROUP_REPOSITORY } from '../../domain/group/group.repository';
import { MySqlGroupRepository } from '../domain/group/group.repository.mysql';
import { db } from 'src/database/database';
import { DOMAIN_EVENT_DISPATCHER } from 'src/shared/application/domainEvent.dispatcher';
import { DefaultDomainEventDispatcher } from 'src/shared/infra/domainEvent/domainEventDispatcher.default';
import { USER_CONTEXT } from '../../domain/user/user.context';
import { DefaultUserContext } from '../domain/user/user.context.default';

const commandHandlers = [CreateGroupCommandHandler];

const repositories: Provider[] = [
  {
    provide: GROUP_REPOSITORY,
    useClass: MySqlGroupRepository,
  },
];

const etc: Provider[] = [
  // {
  //   provide: DOMAIN_EVENT_DISPATCHER,
  //   useClass: DefaultDomainEventDispatcher,
  // },
  {
    provide: USER_CONTEXT,
    useClass: DefaultUserContext,
  },
  {
    provide: 'DB',
    useValue: db,
  },
  // {
  //   provide: OUTBOX,
  //   useClass: MySqlOutbox,
  // },
  // //   Scheduler,
  // {
  //   provide: COMMAND_ENQUEUER,
  //   useClass: MySqlCommandEnqueuer,
  // },
];

@Module({
  imports: [CqrsModule, UnitOfWorkModule],
  providers: [
    ...commandHandlers,
    //   ...queryHandlers,
    //   ...eventHandlers,
    ...repositories,
    ...etc,
  ],
  exports: [...commandHandlers],
})
export class EventModule {}
