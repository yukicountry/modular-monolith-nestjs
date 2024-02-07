import { DomainEvent } from '../domain/domainEvent.base';

export interface DomainEventDispatcher {
  dispatchEvents(domainEvents: DomainEvent[]): Promise<void>;
}

export const DOMAIN_EVENT_DISPATCHER = Symbol('DOMAIN_EVENT_DISPATCHER');
