import { IntegrationEvent } from './integrationEvent.base';

export interface EventBus {
  publish(integrationEvents: IntegrationEvent[]): Promise<void>;
}
