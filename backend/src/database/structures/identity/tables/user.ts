import { Selectable } from 'kysely';

export interface UsersTable {
  id: string;
  email: string;
  hashed_password: string;
  user_name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export type User = Selectable<UsersTable>;
