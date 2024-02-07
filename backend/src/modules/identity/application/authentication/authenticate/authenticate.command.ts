import { Command } from 'src/shared/application/commands/command.base';

type AuthenticateCommandProps = {
  email: string;
  password: string;
};

export class AuthenticateCommand extends Command<AuthenticateCommandProps> {
  getType(): string {
    throw new Error('Method not implemented.');
  }
}
