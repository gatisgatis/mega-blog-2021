export const CHANGE_ACTIVE_TAG = 'CHANGE_ACTIVE_TAG';

export interface ActiveTag {
  value: string;
}

export interface ChangeActiveTagAction {
  type: typeof CHANGE_ACTIVE_TAG;
  payload: { value: string };
}

export type SearchActions = ChangeActiveTagAction;
