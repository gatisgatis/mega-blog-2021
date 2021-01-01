import { User } from '../../types/types';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const CHANGE_USER_INFO = 'CHANGE_USER_INFO';

export interface LogInAction {
  type: typeof LOG_IN;
  payload: { user: User};
}

export interface LogOutAction {
  type: typeof LOG_OUT;
}

export interface ChangeUserInfoAction {
  type: typeof CHANGE_USER_INFO;
  payload: { user: User };
}

export type UserActions = LogInAction | LogOutAction | ChangeUserInfoAction;

