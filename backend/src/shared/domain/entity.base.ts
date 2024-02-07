import { BusinessRuleViolationError } from './businessRuleViolation.error';

export type CreateEntityParams<Id, EntityProps> = {
  id: Id;
  props: EntityProps;
  createdAt: Date;
  updatedAt: Date;
};

export class Entity<Id, EntityProps> {
  readonly #id: Id;
  #props: EntityProps;
  #createdAt: Date;
  #updatedAt: Date;

  constructor({
    id,
    props,
    createdAt,
    updatedAt,
  }: CreateEntityParams<Id, EntityProps>) {
    this.#id = id;
    this.props = props;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get id() {
    return this.#id;
  }

  get props() {
    return this.#props;
  }

  private set props(props: EntityProps) {
    this.#props = props;
  }

  get createdAt() {
    return this.#createdAt;
  }

  private set createdAt(createdAt: Date) {
    this.#createdAt = createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  private set updatedAt(updatedAt: Date | undefined) {
    this.#updatedAt = updatedAt;
  }
}
