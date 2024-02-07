import { ValueObject } from 'src/shared/domain/valueObject.base';
import {
  hasMultiByteLengthBetween,
  isAlphaNumeric,
} from 'src/shared/utils/assert';

export class UserRegistrationId extends ValueObject<string> {
  static readonly MIN_LENGTH = 1;
  static readonly MAX_LENGTH = 50;

  protected assert(value: string): void {
    isAlphaNumeric(value);
    hasMultiByteLengthBetween({
      value: value,
      min: UserRegistrationId.MIN_LENGTH,
      max: UserRegistrationId.MAX_LENGTH,
    });
  }
}
