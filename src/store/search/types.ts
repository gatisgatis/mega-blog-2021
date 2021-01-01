export const CHANGE_SEARCH_INPUT = 'CHANGE_SEARCH_INPUT';

export interface Search {
  value: string;
}

export interface ChangeSearchInputAction {
  type: typeof CHANGE_SEARCH_INPUT;
  payload: { value: string };
}

export type SearchActions = ChangeSearchInputAction;
