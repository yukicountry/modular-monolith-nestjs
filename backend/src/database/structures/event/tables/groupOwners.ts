import { Selectable } from 'kysely';

export interface GroupsOwnersTable {
  user_id: string;
  group_id: string;
  assigned_at: Date;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export type User = Selectable<GroupsOwnersTable>;
