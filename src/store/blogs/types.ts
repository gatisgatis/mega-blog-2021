import { Blog } from '../../types/types';

export const ADD_NEW_BLOG = 'ADD_NEW_BLOG';
export const EDIT_BLOG = 'EDIT_BLOG';
export const DELETE_BLOG = 'DELETE_BLOG';

export interface AddNewBlogAction {
  type: typeof ADD_NEW_BLOG;
  payload: { blog: Blog };
}

export interface EditBlogAction {
  type: typeof EDIT_BLOG;
  payload: { blog: Blog };
}

export interface DeleteBlogAction {
  type: typeof DELETE_BLOG;
  payload: { id: string };
}

export type BlogAction = AddNewBlogAction| EditBlogAction | DeleteBlogAction;