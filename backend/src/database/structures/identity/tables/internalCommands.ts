import { Selectable } from 'kysely';

export interface InternalCommandsTable {
  id: string;
  type: string;
  enqueued_at: Date;
  props: string;
  completed_at?: Date;
  failed_at?: Date;
  failed_reason?: string;
}

export type InternalCommand = Selectable<InternalCommandsTable>;
