import React, { Component } from "react";
import PropTypes from 'prop-types';


class Hello extends Component {
    render() {
        return (
            <div>
                <h3>Hello {this.props.name}</h3>
            </div>
        );
    }
}

Hello.propTypes = {
    name: PropTypes.string.isRequired
}

Hello.defaultProps = {
    name: "Ля-ля-ля"
}
  
export default Hello;