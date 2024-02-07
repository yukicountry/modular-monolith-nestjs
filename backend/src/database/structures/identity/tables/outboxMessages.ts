import { Selectable } from 'kysely';

export interface OutboxMessagesTable {
  type: string;
  version: number;
  id: string;
  occurred_at: Date;
  detail: string;
  processed_at?: Date;
}

export type OutboxMessage = Selectable<OutboxMessagesTable>;
