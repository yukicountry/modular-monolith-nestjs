import { ProcessOutboxCommand } from './processOutbox.command';
import { Kysely } from 'kysely';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject } from '@nestjs/common';
import { domainEventMapper } from 'src/shared/infra/domainEvent/domainEvent.mapper';
import { Database } from 'src/database/database';

export class ProcessOutboxCommandHandler {
  constructor(
    @Inject('DB') private readonly db: Kysely<Database>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handle(_: ProcessOutboxCommand): Promise<void> {
    console.log(`${this.constructor.name} processed.`);

    await this.fetchNonProcessedOutboxMessages().then((outboxMessages) =>
      outboxMessages.forEach(async (message) => {
        const domainEvent = domainEventMapper[message.type]?.(message);

        if (domainEvent == null) {
          return;
        }

        this.eventEmitter.emit(domainEvent.getType(), domainEvent);
        await this.db
          .updateTable('identity_outbox_messages')
          .set('processed_at', new Date())
          .where('id', '=', domainEvent.id)
          .execute();
      }),
    );
  }

  private fetchNonProcessedOutboxMessages() {
    return this.db
      .selectFrom('identity_outbox_messages')
      .selectAll()
      .where('processed_at', 'is', null)
      .orderBy('occurred_at')
      .execute();
  }
}
