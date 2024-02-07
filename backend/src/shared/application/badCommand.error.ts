export class BadCommandError extends Error {
  static {
    this.prototype.name = 'BadCommandError';
  }
}
