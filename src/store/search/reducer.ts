import { CHANGE_SEARCH_INPUT, SearchActions, Search } from './types';

const defaultState: Search = {
  value: '',
};

export const searchReducer = (state = defaultState, action: SearchActions) => {
  switch (action.type) {
    case CHANGE_SEARCH_INPUT: {
      const newState = { ...state };
      newState.value = action.payload.value;
      return newState;
    }
    default:
      return state;
  }
};
