import { ValueObject } from 'src/shared/domain/valueObject.base';

export class UserId extends ValueObject<string> {
  protected assert(value: string): void {
    //
  }
}
