import { OutboxMessage as OutboxMessagePersistence } from 'src/database/structures/identity/tables/outboxMessages';
import { OutboxMessage } from 'src/shared/application/outbox/outboxMessage';

export class OutboxMapper {
  static toPersistence(model: OutboxMessage): OutboxMessagePersistence {
    return {
      type: model.type,
      version: model.version,
      id: model.id,
      occurred_at: model.occurredAt,
      detail: JSON.stringify(model.detail),
      processed_at: model.processedAt,
    };
  }
}
