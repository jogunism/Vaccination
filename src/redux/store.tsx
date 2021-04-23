import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleware);
