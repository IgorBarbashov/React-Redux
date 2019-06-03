import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import App from './App';

import { handleActions } from 'redux-actions';
import * as actions from './actions';

const test1 = handleActions ({
    [actions.action11](state, { payload }) { return {...state, type1: payload }},
    [actions.action12](state, { payload }) { return {...state, type2: payload }},
}, [1, 2]);

const test2 = handleActions ({
    [actions.action21](state, { payload }) { return {...state, type1: payload }},
    [actions.action22](state, { payload }) { return {...state, type2: payload }}
}, [3, 4]);

const reducer = combineReducers({
    test1,
    test2
});

const middlewares = [];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));