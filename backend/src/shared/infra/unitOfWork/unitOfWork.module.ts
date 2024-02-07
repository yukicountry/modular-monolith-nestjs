import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { UnitOfWorkExplorer } from './unitOfWork.explorer';
import { UnitOfWorkProvider } from './unitOfWork.provider';
import { DefaultUnitOfWorkProvider } from './unitOfWork.provider.default';
import { db } from 'src/database/database';
import { DOMAIN_EVENT_DISPATCHER } from 'src/shared/application/domainEvent.dispatcher';
import { DefaultDomainEventDispatcher } from '../domainEvent/domainEventDispatcher.default';
import { OUTBOX } from 'src/shared/application/outbox/outbox';
import { MySqlOutbox } from 'src/modules/identity/infra/outbox/outbox.mysql';
import { AlsModule } from '../config/als.module';

@Module({
  imports: [DiscoveryModule, AlsModule],
  providers: [
    UnitOfWorkExplorer,
    {
      provide: UnitOfWorkProvider,
      useClass: DefaultUnitOfWorkProvider,
    },
    {
      provide: 'DB',
      useValue: db,
    },
    {
      provide: DOMAIN_EVENT_DISPATCHER,
      useClass: DefaultDomainEventDispatcher,
    },
    {
      provide: OUTBOX,
      useClass: MySqlOutbox,
    },
  ],
})
export class UnitOfWorkModule {}
