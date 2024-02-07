import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api/api.module';
import { IdentityModule } from './modules/identity/infra/config/identity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from './modules/event/infra/config/event.module';

@Module({
  imports: [
    IdentityModule,
    EventModule,
    ApiModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
