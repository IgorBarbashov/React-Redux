import React, { Component } from 'react';
import Game from './components/game';
import EndGame from './components/endgame';
import Wellcome from './components/wellcome';
import { HashRouter, Route } from 'react-router-dom';

class App extends Component {

render() {
  return (
    <HashRouter>
      <>
        <Route path="/" exact component={Wellcome}></Route>
        <Route path="/game" component={Game}></Route>
        <Route path="/endgame" component={EndGame}></Route>
      </>
    </HashRouter>
  )
  }
}

export default App;
