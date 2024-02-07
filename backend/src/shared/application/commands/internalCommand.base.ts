import { randomUUID } from 'crypto';

type CreateInternalCommandParams<T> = {
  id?: string;
  type: string;
  enqueued_at?: Date;
  props: T;
  completed_at?: Date;
  failed_at?: Date;
  failed_reason?: string;
};

export abstract class InternalCommand<T = never> {
  readonly id: string;
  readonly type: string;
  readonly enqueued_at: Date;
  readonly props: T;
  completed_at?: Date;
  failed_at?: Date;
  failed_reason?: string;

  constructor(params: CreateInternalCommandParams<T>) {
    this.id = params.id ?? randomUUID();
    this.type = params.type;
    this.enqueued_at = params.enqueued_at ?? new Date();
    this.props = params.props;
    this.completed_at = params.completed_at;
    this.failed_at = params.failed_at;
    this.failed_reason = params.failed_reason;
  }
}
