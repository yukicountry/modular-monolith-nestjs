import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database } from 'src/database/database';
import { InternalCommand } from 'src/database/structures/identity/tables/internalCommands';
import { Command } from 'src/shared/application/commands/command.base';
import { CommandEnqueuer } from 'src/shared/application/commands/commandEnqueuer';

@Injectable()
export class MySqlCommandEnqueuer implements CommandEnqueuer {
  constructor(@Inject('DB') private readonly db: Kysely<Database>) {}

  async enqueue<T>(command: Command<T>): Promise<void> {
    const persistance: InternalCommand = {
      id: command.id,
      type: command.getType(),
      enqueued_at: new Date(),
      props: JSON.stringify(command.props),
      completed_at: undefined,
      failed_at: undefined,
      failed_reason: undefined,
    };

    await this.db
      .insertInto('identity_internal_commands')
      .values(persistance)
      .execute();
  }
}
