import { ValueObject } from 'src/shared/domain/valueObject.base';

export class GroupId extends ValueObject<string> {
  protected assert(value: string): void {
    //
  }
}
