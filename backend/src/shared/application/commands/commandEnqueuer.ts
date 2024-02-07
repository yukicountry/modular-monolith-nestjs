import { Command } from './command.base';

export interface CommandEnqueuer {
  enqueue<T>(command: Command<T>): Promise<void>;
}

export const COMMAND_ENQUEUER = Symbol('COMMAND_ENQUEUER');
