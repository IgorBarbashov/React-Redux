import React, { Component } from 'react';
import { Redirect, Link} from 'react-router-dom';

class EndGame extends Component {
 
render() {
    if (!this.props.location.state || !this.props.location.state.player) {
        return <Redirect to="/" />;
    }

  return (
    <div>
       <p>Конец игры</p>
       <p>Победил: {this.props.location.state.player}</p>
       <Link to="/">Новая игра</Link>
    </div>
  );
  }
}

export default EndGame;
