import { Inject, Injectable } from '@nestjs/common';
import { UnitOfWorkProvider } from './unitOfWork.provider';
import { Kysely } from 'kysely';
import { AsyncLocalStorage } from 'async_hooks';
import { Command } from 'src/shared/application/commands/command.base';
import { Database } from 'src/database/database';

@Injectable()
export class DefaultUnitOfWorkProvider implements UnitOfWorkProvider {
  constructor(
    @Inject('DB') private readonly db: Kysely<Database>,
    private readonly als: AsyncLocalStorage<unknown>,
  ) {}

  attach(
    instance: Record<string, (...args: unknown[]) => Promise<void>>,
    methodName: string,
  ): void {
    const originalMethod = instance[methodName];

    instance[methodName] = async (...args: unknown[]) => {
      return this.db.transaction().execute(async (trx) => {
        const store = {
          trx,
        };

        return this.als.run(store, async () => {
          const commandResult = await originalMethod.apply(instance, args);

          const command = args[0];

          if (command instanceof Command) {
            this.db
              .updateTable('identity_internal_commands')
              .set('completed_at', new Date())
              .where('id', '=', command.id)
              .execute();
          }

          return commandResult;
        });
      });
    };
  }
}
