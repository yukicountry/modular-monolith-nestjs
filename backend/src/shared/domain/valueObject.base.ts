export type DomainPrimitive = string | number | boolean | Date;

export abstract class ValueObject<T> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  equals(something: unknown): boolean {
    if (something == null) {
      return false;
    }
    return JSON.stringify(this) === JSON.stringify(something);
  }

  toJSON(): T {
    return this.value;
  }
}
