import { Selectable } from 'kysely';

export interface GroupsTable {
  id: string;
  name: string;
  description: string;
  creator_id: string;
  created_at: Date;
  updated_at: Date;
}

export type User = Selectable<GroupsTable>;
