import { Outbox } from 'src/shared/application/outbox/outbox';
import { OutboxMessage } from 'src/shared/application/outbox/outboxMessage';
import { OutboxMapper } from './outbox.mapper';
import { db } from 'src/database/database';

export class MySqlOutbox implements Outbox {
  async save(messages: OutboxMessage[]): Promise<void> {
    const dbRows = messages.map((message) =>
      OutboxMapper.toPersistence(message),
    );

    await db.insertInto('identity_outbox_messages').values(dbRows).execute();
  }
}
