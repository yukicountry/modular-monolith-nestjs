import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Kysely } from 'kysely';
import { Database } from 'src/database/database';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject('DB') private readonly db: Kysely<Database>) {
    super();
  }

  serializeUser(user: any, done: (err: Error, id: string) => void): void {
    done(null, user.id);
  }

  async deserializeUser(
    id: string,
    done: (err: Error, user: any) => void,
  ): Promise<void> {
    const user = await this.db
      .selectFrom('identity_users')
      .select(['id', 'email'])
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();

    done(null, user);
  }
}
