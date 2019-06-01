import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';
import * as actionCreators from './actions';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

// BEGIN (write your solution here)

const containerElement = document.getElementById('container');

store.subscribe(() => {
  const { text } = store.getState();

  ReactDOM.render(
    <App dispatch={store.dispatch} text={text} {...actionCreators} />,
    containerElement
  );
});

ReactDOM.render(
  <App dispatch={store.dispatch} {...actionCreators} />,
  containerElement
);
// END
