import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
      return(
          <Fragment>
            <div>Menu:</div>
            <div><Link to="/app">App</Link></div>
            <div><Link to="track">Track</Link></div>
          </Fragment>
      );
  };
};

export default Menu;