import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterNewUserRequestDto {
  /**
   * メールアドレス
   */
  @IsEmail()
  readonly email: string;

  /**
   * パスワード
   */
  @IsNotEmpty()
  readonly password: string;

  /**
   * パスワード（確認）
   */
  @IsNotEmpty()
  readonly passwordConfirmation: string;
}
