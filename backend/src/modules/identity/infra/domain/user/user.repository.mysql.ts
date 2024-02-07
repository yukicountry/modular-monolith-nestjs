import { db } from 'src/database/database';
import { UsersTable } from 'src/database/structures/identity/tables/user';
import { User } from 'src/modules/identity/domain/user/user.entity';
import { UserRepository } from 'src/modules/identity/domain/user/user.repository';
import { UserId } from 'src/modules/identity/domain/user/valueObjects/userId.valueObject';

export class MySqlUserRepository implements UserRepository {
  findById(id: UserId): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async save(user: User): Promise<void> {
    const persistance: UsersTable = {
      id: user.id.value,
      email: user.props.email,
      hashed_password: user.props.hashedPassword,
      user_name: user.props.userName,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      deleted_at: user.props.deletedAt,
    };

    await db.insertInto('identity_users').values(persistance).execute();
  }
}
