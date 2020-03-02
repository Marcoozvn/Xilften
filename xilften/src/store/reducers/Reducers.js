import { combineReducers } from 'redux';

import userReducer from './userReducer';
import formReducer from './formReducer';
import tokenReducer from './tokenReducer';
 
const reducers = combineReducers({
  user: userReducer,
  form: formReducer,
  token: tokenReducer
});

export default reducers;