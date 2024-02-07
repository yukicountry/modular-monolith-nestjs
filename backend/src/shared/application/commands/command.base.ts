import { randomUUID } from 'crypto';

type CommandMetadata = {
  readonly correlationId?: string;

  readonly causationId?: string;

  readonly userId?: string;

  readonly dateTime?: Date;
};

export type CreateCommandParams<T> = {
  id?: string;
  metadata?: CommandMetadata;
  props: T;
};

export abstract class Command<T = never> {
  readonly id: string;

  readonly metadata: CommandMetadata;

  readonly props: T;

  constructor(params: CreateCommandParams<T>) {
    this.id = params.id ?? randomUUID();
    this.metadata = params.metadata ?? {};
    this.props = params.props;
  }

  abstract getType(): string;
}
