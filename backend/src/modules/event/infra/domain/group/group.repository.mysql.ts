import { Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database } from 'src/database/database';
import { GroupsOwnersTable } from 'src/database/structures/event/tables/groupOwners';
import { GroupsTable } from 'src/database/structures/event/tables/groups';
import { Group } from 'src/modules/event/domain/group/group.entity';
import { GroupRepository } from 'src/modules/event/domain/group/group.repository';

export class MySqlGroupRepository implements GroupRepository {
  constructor(@Inject('DB') private readonly db: Kysely<Database>) {}

  async save(group: Group): Promise<void> {
    const groupRecord: GroupsTable = {
      id: group.id.value,
      name: group.props.name,
      description: group.props.description,
      creator_id: group.props.creatorId.value,
      created_at: group.createdAt,
      updated_at: group.updatedAt,
    };

    const groupOwnerRecords: GroupsOwnersTable[] = group.props.owners.map(
      (owner) => ({
        user_id: owner.id.value.userId.value,
        group_id: owner.id.value.groupId.value,
        assigned_at: owner.props.assignedAt,
        role: owner.props.role,
        created_at: owner.createdAt,
        updated_at: owner.updatedAt,
      }),
    );

    this.db
      .deleteFrom('event_group_owners')
      .where('group_id', '=', group.id.value)
      .execute();
    this.db.replaceInto('event_groups').values(groupRecord).execute();
    this.db
      .insertInto('event_group_owners')
      .values(groupOwnerRecords)
      .execute();
  }
}
