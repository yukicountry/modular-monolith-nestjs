import { createPool } from 'mysql2'; // do not use 'mysql2/promises'!
import { Kysely, MysqlDialect, ParseJSONResultsPlugin } from 'kysely';
import { InboxMessagesTable } from './structures/identity/tables/inboxMessages';
import { InternalCommandsTable } from './structures/identity/tables/internalCommands';
import { OutboxMessagesTable } from './structures/identity/tables/outboxMessages';
import { UsersTable } from './structures/identity/tables/user';
import { UserRegistrationsTable } from './structures/identity/tables/userRegistrations';
import { GroupsTable } from './structures/event/tables/groups';
import { GroupsOwnersTable } from './structures/event/tables/groupOwners';

const dialect = new MysqlDialect({
  pool: createPool({
    database: 'dev_db',
    host: 'db',
    user: 'dev_user',
    password: 'secret',
    port: 3306,
    connectionLimit: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
  plugins: [new ParseJSONResultsPlugin()],
});

export interface Database {
  identity_user_registrations: UserRegistrationsTable;
  identity_users: UsersTable;
  identity_outbox_messages: OutboxMessagesTable;
  identity_inbox_messages: InboxMessagesTable;
  identity_internal_commands: InternalCommandsTable;
  event_groups: GroupsTable;
  event_group_owners: GroupsOwnersTable;
}
