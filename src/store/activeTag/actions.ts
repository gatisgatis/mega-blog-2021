import { CHANGE_ACTIVE_TAG, ChangeActiveTagAction } from './types';

export const changeActiveTagInput = (value: string): ChangeActiveTagAction => {
  return {
    type: CHANGE_ACTIVE_TAG,
    payload: { value },
  };
};
