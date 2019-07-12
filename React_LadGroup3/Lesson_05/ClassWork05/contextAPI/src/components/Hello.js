import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from '../context';


class Hello extends Component {
  render() {
    return (
      <Context.Consumer>
        {
          (context) => {
            return <h1 onClick={context.onClick}>{context.currentHello} {this.props.name}</h1>
          }
        }
      </Context.Consumer>
    )
  }
}

Hello.propTypes = {
  name: PropTypes.string.isRequired
};

Hello.defaultProps = {
  name: 'Незнакомец'
}

export default Hello;