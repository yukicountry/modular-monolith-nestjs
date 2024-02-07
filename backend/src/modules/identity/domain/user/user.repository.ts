import { User } from './user.entity';
import { UserId } from './valueObjects/userId.valueObject';

export interface UserRepository {
  findById(id: UserId): Promise<User | undefined>;

  save(user: User): Promise<void>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
