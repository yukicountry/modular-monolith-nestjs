import { UserId } from './valueObjects/userId.valueObject';

export interface UserContext {
  getUserId(): UserId;
}

export const USER_CONTEXT = Symbol('USER_CONTEXT');
