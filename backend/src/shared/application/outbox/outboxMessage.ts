type OutboxMessageParams = Omit<OutboxMessage, 'processedAt'>;

export class OutboxMessage {
  readonly version: number;
  readonly id: string;
  readonly occurredAt: Date;
  readonly type: string;
  readonly detail: unknown;
  processedAt?: Date;

  constructor(params: OutboxMessageParams) {
    this.id = params.id;
    this.occurredAt = params.occurredAt;
    this.type = params.type;
    this.detail = params.detail;
  }
}
