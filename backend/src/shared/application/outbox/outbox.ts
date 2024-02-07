import { OutboxMessage } from './outboxMessage';

export interface Outbox {
  save(messages: OutboxMessage[]): Promise<void>;
}

export const OUTBOX = Symbol('OUTBOX');
