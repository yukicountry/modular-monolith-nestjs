import { Selectable } from 'kysely';

export interface UserRegistrationsTable {
  id: string;
  email: string;
  hashed_password: string;
  confirmed_at: Date | null;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}

export type UserRegistration = Selectable<UserRegistrationsTable>;
