import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Kysely } from 'kysely';
import { GetUserQuery } from './getUser.query';
import { UserDto } from './user.dto';
import { Database } from 'src/database/database';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler
  implements IQueryHandler<GetUserQuery, UserDto | undefined>
{
  constructor(@Inject('DB') private readonly db: Kysely<Database>) {}

  async execute(query: GetUserQuery): Promise<UserDto | undefined> {
    const user = await this.db
      .selectFrom('identity_users')
      .select(['id', 'email', 'user_name'])
      .where('id', '=', query.userId)
      .executeTakeFirst();

    if (user == null) {
      return undefined;
    } else {
      return new UserDto(user.id, user.email, user.user_name);
    }
  }
}
