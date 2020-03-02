import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers/Reducers';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = applyMiddleware(promise, thunk, multi)(createStore)(persistedReducer, devTools);
const persistor = persistStore(store);

export { store, persistor };
