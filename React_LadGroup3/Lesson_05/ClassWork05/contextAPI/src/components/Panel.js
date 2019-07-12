import React, { Component } from 'react';
import Hello from './Hello';
import './panel.css'

class Panel extends Component {
  render() {
    return (
    <div className="panel">
      <Hello name="Alena"/>
      <Hello name="Oleg"/>
      <Hello name="Ivan"/>
    </div>);
  }
}

export default Panel;