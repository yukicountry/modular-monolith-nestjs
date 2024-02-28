import { SetMetadata } from '@nestjs/common';

export const UNIT_OF_WORK = Symbol('UNIT_OF_WORK');

export const UnitOfWork = SetMetadata(UNIT_OF_WORK, true);
