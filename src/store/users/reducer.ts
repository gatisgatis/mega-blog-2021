import { User } from '../../types/types';
import { CHANGE_USER_INFO, LOG_IN, LOG_OUT, UserActions } from './types';

const defaultState: User = {
  username: 'guest',
  password: '1233',
  name: 'Guest',
  createdAt: 123,
  rating: 0,
  status: 'guest',
  gender: 'other',
  age: 0,
};

export const userReducer = (state = defaultState, action: UserActions) => {
  switch (action.type) {
    case LOG_IN: {
      return action.payload.user;
    }
    case LOG_OUT: {
      return defaultState;
    }
    case CHANGE_USER_INFO: {
      return state;
    }
    default:
      return state;
  }
};
