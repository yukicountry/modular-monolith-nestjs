import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAuthenticatedUserGroupsQuery } from './getAuthenticatedUserGroups.query';
import { GroupDto } from './group.dto';
import { Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database } from 'src/database/database';

@QueryHandler(GetAuthenticatedUserGroupsQuery)
export class GetAuthenticatedUserGroupsQueryHandler
  implements IQueryHandler<GetAuthenticatedUserGroupsQuery, GroupDto[]>
{
  constructor(@Inject('DB') private readonly db: Kysely<Database>) {}

  async execute(): Promise<GroupDto[]> {
    const groups = await this.db
      .selectFrom('event_groups')
      .innerJoin(
        'event_group_owners',
        'event_group_owners.group_id',
        'event_groups.id',
      )
      .selectAll('event_groups')
      .distinct()
      .where('event_group_owners.user_id', '=', 'hogehoge')
      .execute();

    return groups.map(
      (group) =>
        new GroupDto(
          group.id,
          group.name,
          group.description,
          group.creator_id,
          group.created_at,
          group.updated_at,
        ),
    );
  }
}
