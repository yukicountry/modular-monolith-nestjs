import { ValueObject } from 'src/shared/domain/valueObject.base';
import { EndAtMustBeAfterStartAtRule } from '../rules/endAtMustBeAfterStartAt.rule';

export class EventTerm extends ValueObject<{ startAt: Date; endAt: Date }> {
  static create(startAt: Date, endAt: Date): EventTerm {
    const passes = new EndAtMustBeAfterStartAtRule().passes(startAt, endAt);

    if (!passes) {
      throw new Error('');
    }

    return new EventTerm({ startAt, endAt });
  }
}
