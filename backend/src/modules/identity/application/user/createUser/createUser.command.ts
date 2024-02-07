import { Command } from 'src/shared/application/commands/command.base';

type CreateUserCommandProps = {
  userRegistrationId: string;
  userName: string;
};

export class CreateUserCommand extends Command<CreateUserCommandProps> {
  getType(): string {
    throw new Error('Method not implemented.');
  }
}
