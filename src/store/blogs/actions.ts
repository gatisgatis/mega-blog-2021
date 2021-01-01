import { EDIT_BLOG, ADD_NEW_BLOG, DELETE_BLOG, BlogAction  } from './types';
import { Blog } from '../../types/types';

export const deleteBlog = (id: string): BlogAction => {
  return {
    type: DELETE_BLOG,
    payload: { id },
  };
};

export const editBlog = (blog: Blog): BlogAction => {
  return {
    type: EDIT_BLOG,
    payload: { blog },
  };
};

export const addBlog = (blog: Blog): BlogAction => {
  return {
    type: ADD_NEW_BLOG,
    payload: { blog },
  };
};
