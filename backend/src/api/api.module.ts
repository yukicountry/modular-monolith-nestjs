import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { IdentityModule } from 'src/modules/identity/infra/config/identity.module';
import { AuthenticationController } from './controllers/identity/authentication/authentication.http.controller';
import { UserController } from './controllers/identity/user/user.http.controller';
import { UserRegistrationController } from './controllers/identity/userRegistration/userRegistration.http.controller';
import { FetchAccountSettingsController } from './controllers/mypage/fetchAccountSettings/fetchAccountSettings.http.controller';
import { LocalStrategy } from './auth/local.strategy';
import { SessionSerializer } from './auth/session.serializer';
import { db } from 'src/database/database';
import { CreateGroupController } from './controllers/group/createGroup/createGroup.http.controller';

@Module({
  imports: [
    IdentityModule,
    CqrsModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [
    UserRegistrationController,
    UserController,
    AuthenticationController,
    FetchAccountSettingsController,
    CreateGroupController,
  ],
  providers: [
    LocalStrategy,
    SessionSerializer,
    {
      provide: 'DB',
      useValue: db,
    },
  ],
})
export class ApiModule {}
