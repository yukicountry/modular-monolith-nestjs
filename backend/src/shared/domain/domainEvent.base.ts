import { randomUUID } from 'crypto';

// type DomainEventMetadata = {
//   readonly correlationId: string;
//   readonly causationId?: string;
//   readonly userId?: string;
// };

export type DomainEventParams<T> = {
  type?: string;
  version?: number;
  id?: string;
  occurredAt?: Date;
  detail: T;
};

export abstract class DomainEvent<T = unknown> {
  readonly type: string;

  readonly version: number;

  readonly id: string;

  readonly occurredAt: Date;

  readonly detail: T;

  constructor(params: DomainEventParams<T>) {
    this.type = params.type ?? this.getType();
    this.version = params.version ?? this.getCurrentVersion();
    this.id = params.id ?? randomUUID();
    this.occurredAt = params.occurredAt ?? new Date();
    this.detail = params.detail;
  }

  abstract getCurrentVersion(): number;

  abstract getType(): string;
}
