export class EndAtMustBeAfterStartAtRule {
  passes(startAt: Date, endAt: Date): boolean {
    return startAt < endAt;
  }
}
