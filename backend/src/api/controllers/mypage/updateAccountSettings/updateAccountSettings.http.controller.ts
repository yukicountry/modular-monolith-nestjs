import { Controller, Patch } from '@nestjs/common';

@Controller('api/mypage/account')
export class UpdateAccountSettings {
  @Patch()
  async handle() {
    //
  }
}
