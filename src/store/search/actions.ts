import { CHANGE_SEARCH_INPUT, ChangeSearchInputAction } from './types';

export const changeSearchInput = (value: string): ChangeSearchInputAction => {
  return {
    type: CHANGE_SEARCH_INPUT,
    payload: { value },
  };
};
