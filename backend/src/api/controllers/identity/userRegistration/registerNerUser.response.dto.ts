export class RegisterNewUserResponseDto {
  /**
   * ユーザ登録ID
   */
  readonly userRegistrationId: string;

  constructor(userRegistrationId: string) {
    this.userRegistrationId = userRegistrationId;
  }
}
