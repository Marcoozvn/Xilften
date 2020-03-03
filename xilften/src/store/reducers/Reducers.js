import { combineReducers } from 'redux';

import userReducer from './userReducer';
import formReducer from './formReducer';
import tokenReducer from './tokenReducer';
import movieReducer from './movieReducer';
 
const reducers = combineReducers({
  user: userReducer,
  form: formReducer,
  token: tokenReducer,
  movies: movieReducer
});

export default reducers;