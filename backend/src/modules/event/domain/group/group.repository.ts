import { Group } from './group.entity';

export interface GroupRepository {
  save(group: Group): Promise<void>;
}

export const GROUP_REPOSITORY = Symbol('GROUP_REPOSITORY');
