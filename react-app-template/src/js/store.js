// ok
// пока нет webpack, с isDev стоит заглушка
import { createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducerCreator } from './reducers';

import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();
const reducer = reducerCreator(history);
const middlewares = [routerMiddleware(history), thunk];

// const isDev = process.env.NODE_ENV === `development`;
const isDev = true;

const enhancer = isDev ? composeWithDevTools : compose;
export const store = createStore(reducer, enhancer(applyMiddleware(...middlewares)));