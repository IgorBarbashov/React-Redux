import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducerCreator } from './reducers';

import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createHashHistory();
const reducer = reducerCreator(history);
const middlewares = [routerMiddleware(history), thunk];

export const store = createStore(reducer,
        composeWithDevTools( applyMiddleware(...middlewares) ));