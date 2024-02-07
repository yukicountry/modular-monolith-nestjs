import { AggregateRoot } from 'src/shared/domain/aggregateRoot.base';
import { EventId } from './valueObjects/eventId.valueObject';
import { EventCategory } from './eventCategory.enum';
import { EventTerm } from './valueObjects/eventTerm.valueObject';
import { CountryCode } from './country.enum';
import { OpenStatus } from './openStatus.enum';
import { GroupId } from '../group/valueObjects/groupId.valueObject';

type EventProps = {
  groupId: GroupId;
  name: string;
  country: CountryCode;
  detail?: string;
  picture?: string;
  term: EventTerm;
  categories: EventCategory[];
  openStatus: OpenStatus;
};

export class Event extends AggregateRoot<EventId, EventProps> {}
