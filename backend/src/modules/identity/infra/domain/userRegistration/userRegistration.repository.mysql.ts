import { Injectable } from '@nestjs/common';
import { db } from 'src/database/database';
import { UserRegistrationsTable } from 'src/database/structures/identity/tables/userRegistrations';
import { UserRegistration } from 'src/modules/identity/domain/userRegistration/userRegistration.entity';
import { UserRegistrationRepository } from 'src/modules/identity/domain/userRegistration/userRegistration.repository';
import { UserRegistrationId } from 'src/modules/identity/domain/userRegistration/valueObjects/userRegistrationId.valueObject';

@Injectable()
export class MySqlUserRegistrationRepository
  implements UserRegistrationRepository
{
  async findById(
    id: UserRegistrationId,
  ): Promise<UserRegistration | undefined> {
    const dbRecord = await db
      .selectFrom('identity_user_registrations')
      .selectAll()
      .where('id', '=', id.value)
      .executeTakeFirst();

    if (dbRecord == null) {
      return undefined;
    }

    return new UserRegistration({
      id: new UserRegistrationId(dbRecord.id),
      props: {
        hashedPassword: dbRecord.hashed_password,
        email: dbRecord.email,
        expiresAt: dbRecord.expires_at,
        confirmedAt: dbRecord.confirmed_at,
      },
      createdAt: dbRecord.created_at,
      updatedAt: dbRecord.updated_at,
    });
  }

  async save(userRegistration: UserRegistration): Promise<void> {
    const persistance: UserRegistrationsTable = {
      id: userRegistration.id.value,
      email: userRegistration.props.email,
      hashed_password: userRegistration.props.hashedPassword,
      confirmed_at: userRegistration.props.confirmedAt,
      expires_at: userRegistration.props.expiresAt,
      created_at: userRegistration.createdAt,
      updated_at: userRegistration.updatedAt,
    };

    await db
      .insertInto('identity_user_registrations')
      .values(persistance)
      .execute();
  }
}
