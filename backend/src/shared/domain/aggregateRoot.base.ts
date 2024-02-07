import { DomainEvent } from './domainEvent.base';
import { Entity } from './entity.base';

export abstract class AggregateRoot<Id, EntityProps> extends Entity<
  Id,
  EntityProps
> {
  #events: DomainEvent[] = [];

  get events() {
    return this.#events;
  }

  protected addEvent(event: DomainEvent): void {
    this.#events.push(event);
  }

  public clearEvents(): void {
    this.#events = [];
  }
}
