import { ValueObject } from 'src/shared/domain/valueObject.base';

export class EventId extends ValueObject<string> {
  protected assert(value: string): void {
    //
  }
}
