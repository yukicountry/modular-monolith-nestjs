export abstract class UnitOfWorkProvider {
  abstract attach(
    instance: Record<string, (...args: unknown[]) => Promise<void>>,
    methodName: string,
  ): void;
}
