import { pbkdf2Sync, randomBytes } from 'crypto';

export class PasswordHasher {
  makeHash(rawPassword: string): string {
    const salt = randomBytes(16);
    return pbkdf2Sync(rawPassword, salt, 310000, 32, 'sha256').toString(
      'base64',
    );
  }

  verify(rawPassword: string, hashedPassword): boolean {
    // TODO
    return true;
  }
}
