import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('identity_user_registrations')
    .addColumn('id', 'varchar(255)', (col) => col.primaryKey())
    .addColumn('email', 'varchar(255)', (col) => col.notNull())
    .addColumn('hashed_password', 'varchar(255)', (col) => col.notNull())
    .addColumn('confirmed_at', 'datetime(3)')
    .addColumn('expires_at', 'datetime(3)', (col) => col.notNull())
    .addColumn('created_at', 'datetime(3)', (col) => col.notNull())
    .addColumn('updated_at', 'datetime(3)', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('identity_users')
    .addColumn('id', 'varchar(255)', (col) => col.primaryKey())
    .addColumn('email', 'varchar(255)', (col) => col.notNull())
    .addColumn('hashed_password', 'varchar(255)', (col) => col.notNull())
    .addColumn('user_name', 'varchar(255)', (col) => col.notNull())
    .addColumn('created_at', 'datetime(3)', (col) => col.notNull())
    .addColumn('updated_at', 'datetime(3)', (col) => col.notNull())
    .addColumn('deleted_at', 'datetime(3)')
    .execute();

  await db.schema
    .createTable('identity_outbox_messages')
    .addColumn('id', 'varchar(255)', (col) => col.primaryKey())
    .addColumn('type', 'varchar(255)', (col) => col.notNull())
    .addColumn('version', 'int8', (col) => col.notNull())
    .addColumn('occurred_at', 'datetime(3)', (col) => col.notNull())
    .addColumn('detail', 'json', (col) => col.notNull())
    .addColumn('processed_at', 'datetime(3)')
    .execute();

  await db.schema
    .createTable('identity_internal_commands')
    .addColumn('id', 'varchar(255)', (col) => col.primaryKey())
    .addColumn('type', 'varchar(255)', (col) => col.notNull())
    .addColumn('enqueued_at', 'datetime(3)', (col) => col.notNull())
    .addColumn('props', 'json')
    .addColumn('completed_at', 'datetime(3)')
    .addColumn('failed_at', 'datetime(3)')
    .addColumn('failed_reason', 'varchar(10000)')
    .execute();

  await db.schema
    .createTable('event_groups')
    .addColumn('id', 'varchar(255)', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('description', 'varchar(255)', (col) => col.notNull())
    .addColumn('creator_id', 'varchar(255)', (col) => col.notNull())
    .addColumn('created_at', 'datetime(3)', (col) => col.notNull())
    .addColumn('updated_at', 'datetime(3)', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('event_group_owner_roles')
    .addColumn('role', 'varchar(255)', (col) => col.primaryKey())
    .execute();

  await db.schema
    .createTable('event_group_owners')
    .addColumn('user_id', 'varchar(255)', (col) => col.notNull())
    .addColumn('group_id', 'varchar(255)', (col) => col.notNull())
    .addColumn('assigned_at', 'varchar(255)', (col) => col.notNull())
    .addColumn('role', 'varchar(255)', (col) => col.notNull())
    .addColumn('created_at', 'datetime(3)', (col) => col.notNull())
    .addColumn('updated_at', 'datetime(3)', (col) => col.notNull())
    .addPrimaryKeyConstraint('event_group_owners_primary', [
      'user_id',
      'group_id',
    ])
    .addForeignKeyConstraint(
      'event_group_owners_user_id_foreign',
      ['group_id'],
      'event_groups',
      ['id'],
      (cb) => cb.onDelete('restrict').onUpdate('cascade'),
    )
    .addForeignKeyConstraint(
      'event_group_owners_role_foreign',
      ['role'],
      'event_group_owner_roles',
      ['role'],
      (cb) => cb.onDelete('restrict').onUpdate('cascade'),
    )
    .execute();

  ////////////////////////////

  await db
    .insertInto('event_group_owner_roles')
    .values([{ role: 'MainOwner' }, { role: 'SubOwner' }])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('event_group_owners').execute();
  await db.schema.dropTable('event_group_owner_roles').execute();
  await db.schema.dropTable('event_groups').execute();
  await db.schema.dropTable('identity_internal_commands').execute();
  await db.schema.dropTable('identity_outbox_messages').execute();
  await db.schema.dropTable('identity_users').execute();
  await db.schema.dropTable('identity_user_registrations').execute();
}
