import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result, err, ok } from 'neverthrow';
import { GroupId } from 'src/modules/event/domain/group/valueObjects/groupId.valueObject';
import {
  DOMAIN_EVENT_DISPATCHER,
  DomainEventDispatcher,
} from 'src/shared/application/domainEvent.dispatcher';
import { CreateGroupCommand } from './createGroup.command';
import { Group } from 'src/modules/event/domain/group/group.entity';
import {
  USER_CONTEXT,
  UserContext,
} from 'src/modules/event/domain/user/user.context';
import {
  GROUP_REPOSITORY,
  GroupRepository,
} from 'src/modules/event/domain/group/group.repository';
import { BusinessRuleViolationError } from 'src/shared/domain/businessRuleViolation.error';

@CommandHandler(CreateGroupCommand)
export class CreateGroupCommandHandler
  implements
    ICommandHandler<
      CreateGroupCommand,
      Result<GroupId, BusinessRuleViolationError>
    >
{
  constructor(
    // @Inject(DOMAIN_EVENT_DISPATCHER)
    // private readonly dispatcher: DomainEventDispatcher,

    @Inject(USER_CONTEXT) private readonly userContext: UserContext,

    @Inject(GROUP_REPOSITORY) private readonly groupRepo: GroupRepository,
  ) {}

  async execute(
    command: CreateGroupCommand,
  ): Promise<Result<GroupId, BusinessRuleViolationError>> {
    const result = Group.createGroup({
      ...command.props,
      creatorId: this.userContext.getUserId(),
    });

    if (result.isErr()) {
      return err(result.error);
    }

    const group = result.value;

    this.groupRepo.save(group);
    // this.dispatcher.dispatchEvents(group.events);

    return ok(group.id);
  }
}
