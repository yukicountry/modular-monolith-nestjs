import { AggregateRoot } from 'src/shared/domain/aggregateRoot.base';
import { GroupId } from './valueObjects/groupId.valueObject';
import { randomUUID } from 'crypto';
import { Result, ok } from 'neverthrow';
import { BusinessRuleViolationError } from 'src/shared/domain/businessRuleViolation.error';
import { GroupCreated } from './domainEvents/groupCreated.domainEvent';
import { UserId } from '../user/valueObjects/userId.valueObject';
import { GroupOwner } from './groupOwner.entity';
import { GroupOwnerId } from './valueObjects/groupOwnerId.valueObject';
import { GroupOwnerRole } from './groupOwnerRole.enum';
import { SubOwnerNumbersLimitRule } from './rules/subOwnerNumbersLimit.rule';
import { GroupSubOwnerAdded } from './domainEvents/groupSubOwnerAdded.domainEvent';

type GroupEntityProps = {
  name: string;
  description?: string;
  creatorId: UserId;
  owners: GroupOwner[];
};

type CreateGroupParams = Omit<GroupEntityProps, 'owners'>;

export class Group extends AggregateRoot<GroupId, GroupEntityProps> {
  static createGroup(
    params: CreateGroupParams,
  ): Result<Group, BusinessRuleViolationError> {
    const newGroupId = new GroupId(randomUUID());

    const firstGroupOwner = new GroupOwner({
      id: new GroupOwnerId({ userId: params.creatorId, groupId: newGroupId }),
      props: { role: GroupOwnerRole.MainOwner, assignedAt: new Date() },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const group = new Group({
      id: structuredClone(newGroupId),
      props: { ...params, owners: [firstGroupOwner] },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    group.addEvent(
      new GroupCreated({
        detail: {
          groupId: group.id.value,
          name: group.props.name,
          description: group.props.description,
          creatorId: group.props.creatorId.value,
        },
      }),
    );

    return ok(group);
  }

  addSubOwner(userId: UserId): Result<void, BusinessRuleViolationError> {
    new SubOwnerNumbersLimitRule().check(this.props.owners);

    const newSubOwner = new GroupOwner({
      id: new GroupOwnerId({ userId, groupId: this.id }),
      props: {
        role: GroupOwnerRole.SubOwner,
        assignedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.props.owners.push(newSubOwner);

    this.addEvent(
      new GroupSubOwnerAdded({
        detail: {
          groupOwnerId: newSubOwner.id,
        },
      }),
    );

    return ok(undefined);
  }
}
