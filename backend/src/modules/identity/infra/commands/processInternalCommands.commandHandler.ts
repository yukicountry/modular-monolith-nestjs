import { CommandBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { commandMapper } from './command.mapper';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Database } from 'src/database/database';

export class ProcessQueuedCommandsCommandHandler {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject('DB') private readonly db: Kysely<Database>,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async execute(): Promise<void> {
    console.log(`${this.constructor.name} processed.`);

    const rows = await this.fetchIncompleteInternalCommands();

    rows.forEach(async (row) => {
      const command = commandMapper[row.type]?.(row);
      await this.commandBus.execute(command);
    });
  }

  private fetchIncompleteInternalCommands() {
    return this.db
      .selectFrom('identity_internal_commands')
      .selectAll()
      .where('completed_at', 'is', null)
      .orderBy('enqueued_at')
      .execute();
  }
}
