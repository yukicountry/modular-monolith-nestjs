import { Command } from 'src/shared/application/commands/command.base';

type RegisterNewUserCommandProps = {
  rawPassword: string;
  email: string;
};

export class RegisterNewUserCommand extends Command<RegisterNewUserCommandProps> {
  static COMMAND_TYPE = 'identity.registerNewUser';

  getType(): string {
    return RegisterNewUserCommand.COMMAND_TYPE;
  }
}
