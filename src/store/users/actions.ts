import { User } from '../../types/types';
import { CHANGE_USER_INFO, LOG_IN, LOG_OUT, UserActions } from './types';

export const logIn = (user:User): UserActions => {
  return {
    type: LOG_IN,
    payload: { user },
  };
};

export const logOut = (): UserActions => {
  return {
    type: LOG_OUT,
  };
};

export const changeUserInfo = (user: User): UserActions => {
  return {
    type: CHANGE_USER_INFO,
    payload: { user },
  };
};
