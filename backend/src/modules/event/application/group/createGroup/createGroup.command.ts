import { Command } from 'src/shared/application/commands/command.base';

type CreateGroupCommandProps = {
  name: string;
  description?: string;
};

export class CreateGroupCommand extends Command<CreateGroupCommandProps> {
  static COMMAND_TYPE = 'event.createGroupCommand';

  getType(): string {
    return CreateGroupCommand.COMMAND_TYPE;
  }
}
