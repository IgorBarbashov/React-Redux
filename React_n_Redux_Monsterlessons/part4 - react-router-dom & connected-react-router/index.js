import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import root-reducer without react-routing
// import reducer from './reducers';
import App from './App';

// add middleware 'thunk' for async actions
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// React-routing v4
import { HashRouter, Route, Switch } from 'react-router-dom';
import Track from './components/Track';
import Menu from './components/Menu';

// *************** lesson about react-routing with redux-store ***************
// ***** on new libraries 'react-router-dom' & 'connected-react-router' *****
// depricated
// import createHistory from 'history/createBrowserHistory';
// import { syncHistoryWithStore } from 'react-router-redux';

// Connected React Router
// A Redux binding for React Router v4 and v5
import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';
import { routerMiddleware } from 'connected-react-router';
import { compose } from 'redux';
import { ConnectedRouter } from 'connected-react-router';

const history = createBrowserHistory();
const rootReducer = createRootReducer(history);
const middlewares = [ routerMiddleware(history), thunk ];

const store = createStore(
    rootReducer,
    // preloadedState, // ??????????????????????????
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__( applyMiddleware(...middlewares) )
);
// ****************************************************************************
// ****************************************************************************

// from lesson 8 - about middleware 'thunk' for async actions
// const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>

        {/* React-router v4 * Redux (connected-react-router) */}
        <ConnectedRouter history={history}>
            <Menu />
            <Switch>
                <Route path='/app' component={App}  />
                <Route path='/track' component={Track}  />
            </Switch>
        </ConnectedRouter>
        
        {/* React-router v4 without Readux */}
        {/* <HashRouter>
            <Menu />
            <Route path='/app' component={App}  />
            <Route path='/track' component={Track}  />
        </HashRouter> */}


        {/* React without Routing */}
        {/* <App /> */}

    </Provider>,
    document.getElementById('root')
);