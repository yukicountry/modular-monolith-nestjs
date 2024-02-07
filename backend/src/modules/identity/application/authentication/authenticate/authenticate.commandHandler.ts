import { Result, err, ok } from 'neverthrow';
import { AuthenticateCommand } from './authenticate.command';
import { Kysely } from 'kysely';
import { AuthenticationError } from './authentication.error';
import { AuthenticatedUserDto } from './authenticatedUser.dto';
import { User } from 'src/database/structures/identity/tables/user';
import { PasswordHasher } from 'src/modules/identity/domain/userRegistration/passwordHasher';
import { Inject } from '@nestjs/common';
import { Database } from 'src/database/database';

export class AuthenticateCommandHandler {
  constructor(@Inject('DB') private readonly db: Kysely<Database>) {}

  async handle(
    command: AuthenticateCommand,
  ): Promise<Result<AuthenticatedUserDto, AuthenticationError>> {
    const user = await this.fetchUserByEmail(command.props.email);

    if (user == null) {
      return err(new AuthenticationError('Email or password is not correct.'));
    }

    const passwordVerified = new PasswordHasher().verify(
      command.props.password,
      user.hashed_password,
    );

    if (!passwordVerified) {
      return err(new AuthenticationError('Email or password is not correct.'));
    }

    return ok(new AuthenticatedUserDto(user.id, user.email));
  }

  private async fetchUserByEmail(email: string): Promise<User | undefined> {
    return await this.db
      .selectFrom('identity_users')
      .selectAll()
      .where('email', '=', email)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();
  }
}
