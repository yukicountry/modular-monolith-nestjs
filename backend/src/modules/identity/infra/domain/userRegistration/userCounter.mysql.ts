import { db } from 'src/database/database';
import { UserCounter } from 'src/modules/identity/domain/userRegistration/userCounter';

export class MySqlUserCounter implements UserCounter {
  async countNonDeletedUsersWithEmail(email: string): Promise<number> {
    const result = await db
      .selectFrom('identity_users')
      .select(({ fn }) => [fn.count<number>('identity_users.id').as('count')])
      .where('email', '=', email)
      .where('deleted_at', 'is', null)
      .execute();

    return result.at(0).count;
  }
}
