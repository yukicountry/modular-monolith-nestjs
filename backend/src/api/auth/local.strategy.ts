import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  AuthenticateCommandHandler,
  AuthenticatedUserDto,
  AuthenticateCommand,
} from 'src/modules/identity/application/authentication/authenticate';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly commandHandler: AuthenticateCommandHandler) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.commandHandler.handle(
      new AuthenticateCommand({
        props: {
          email,
          password,
        },
      }),
    );

    if (user.isOk()) {
      return user.value;
    } else {
      throw new UnauthorizedException();
    }
  }
}
