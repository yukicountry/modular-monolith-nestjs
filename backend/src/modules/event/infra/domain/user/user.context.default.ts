import { ExecutionContext } from '@nestjs/common';
import { UserContext } from 'src/modules/event/domain/user/user.context';
import { UserId } from 'src/modules/event/domain/user/valueObjects/userId.valueObject';

export class DefaultUserContext implements UserContext {
  constructor(private readonly context: ExecutionContext) {}

  getUserId(): UserId {
    // return this.context.switchToHttp().getRequest().user.id;
    return new UserId('0e3b240f-71d8-4854-84d9-82629231a776');
  }
}
