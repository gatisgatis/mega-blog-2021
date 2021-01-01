import { cloneDeep } from 'lodash';
import { DELETE_BLOG, ADD_NEW_BLOG, EDIT_BLOG, BlogAction } from './types';
import { Blog } from '../../types/types';
import { BLOGS } from '../../data/blogs';

const blogsLocalStorage:Blog[] = JSON.parse(localStorage.blogs || '[]');
if (blogsLocalStorage.length === 0) {
  localStorage.blogs = JSON.stringify(BLOGS);
}

const defaultState: Blog[] = JSON.parse(localStorage.blogs);

export const blogReducer = (state = defaultState, action: BlogAction) => {
  switch (action.type) {
    case DELETE_BLOG: {
      const newState = cloneDeep(state);
      let deleteIndex = -1;
      newState.forEach((blog, index) => {
        if (blog.id === action.payload.id) deleteIndex = index;
      });
      newState.splice(deleteIndex, 1);
      return newState;
    }
    case ADD_NEW_BLOG: {
      const newState = cloneDeep(state);
      newState.push(action.payload.blog);
      return newState;
    }
    case EDIT_BLOG: {
      const newState = cloneDeep(state);
      let editIndex = -1;
      newState.forEach((blog, index) => {
        if (blog.id === action.payload.blog.id) editIndex = index;
      });
      newState[editIndex] = action.payload.blog;
      return newState;
    }
    default:
      return state;
  }
};
