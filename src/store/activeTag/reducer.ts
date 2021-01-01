import { CHANGE_ACTIVE_TAG, ActiveTag, ChangeActiveTagAction } from './types';

const defaultState: ActiveTag = {
  value: '',
};

export const activeTagReducer = (state = defaultState, action: ChangeActiveTagAction) => {
  switch (action.type) {
    case CHANGE_ACTIVE_TAG: {
      const newState = { ...state };
      newState.value = action.payload.value;
      return newState;
    }
    default:
      return state;
  }
};
