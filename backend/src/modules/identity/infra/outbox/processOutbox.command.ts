import { Command } from 'src/shared/application/commands/command.base';

export class ProcessOutboxCommand extends Command {
  getType(): string {
    throw new Error('Method not implemented.');
  }
}
