import { Inject, Injectable } from '@nestjs/common';
import { DomainEventDispatcher } from 'src/shared/application/domainEvent.dispatcher';
import { OUTBOX, Outbox } from 'src/shared/application/outbox/outbox';
import { OutboxMessage } from 'src/shared/application/outbox/outboxMessage';
import { DomainEvent } from 'src/shared/domain/domainEvent.base';

@Injectable()
export class DefaultDomainEventDispatcher implements DomainEventDispatcher {
  constructor(@Inject(OUTBOX) private readonly outbox: Outbox) {}

  async dispatchEvents(domainEvents: DomainEvent[]): Promise<void> {
    const outboxMessages: OutboxMessage[] = domainEvents.map((event) => ({
      version: event.version,
      id: event.id,
      occurredAt: event.occurredAt,
      detail: event.detail,
      type: event.type,
    }));

    await this.outbox.save(outboxMessages);
  }
}
