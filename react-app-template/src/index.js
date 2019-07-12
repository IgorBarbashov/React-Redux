import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { store, history } from './js/store';
import App from './js/components/app';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/discounts/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>
, document.getElementById('root'));