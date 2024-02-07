import { GroupOwner } from '../groupOwner.entity';
import { GroupOwnerRole } from '../groupOwnerRole.enum';

export class SubOwnerNumbersLimitRule {
  check(owners: GroupOwner[]): void {
    const subOwners = owners.filter(
      (owner) => owner.props.role === GroupOwnerRole.SubOwner,
    );

    if (subOwners.length >= 2) {
      throw new Error('Sub owner cannot be added more than two.');
    }
  }
}
