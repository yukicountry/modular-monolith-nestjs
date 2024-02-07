import { Selectable } from 'kysely';

export interface InboxMessagesTable {
  id: string;
  occurred_at: Date;
  data: object;
  type: string;
  processed_at?: Date;
}

export type InboxMessage = Selectable<InboxMessagesTable>;
