import { createStore, combineReducers } from 'redux';
import { searchReducer } from './search/reducer';
import { activeTagReducer } from './activeTag/reducer';
import { blogReducer } from './blogs/reducer';
import { userReducer } from './users/reducer';

const rootReducer = combineReducers({
  search: searchReducer,
  activeTag: activeTagReducer,
  blogs: blogReducer,
  activeUser: userReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
