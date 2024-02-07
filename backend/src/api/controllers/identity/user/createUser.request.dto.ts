import { IsNotEmpty } from 'class-validator';

export class CreateUserRequestDto {
  @IsNotEmpty()
  readonly userRegistrationId: string;

  @IsNotEmpty()
  readonly userName: string;
}
