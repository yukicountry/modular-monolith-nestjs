import { Entity } from 'src/shared/domain/entity.base';
import { GroupOwnerId } from './valueObjects/groupOwnerId.valueObject';
import { GroupOwnerRole } from './groupOwnerRole.enum';

type GroupOwnerProps = {
  assignedAt: Date;
  role: GroupOwnerRole;
};

export class GroupOwner extends Entity<GroupOwnerId, GroupOwnerProps> {}
