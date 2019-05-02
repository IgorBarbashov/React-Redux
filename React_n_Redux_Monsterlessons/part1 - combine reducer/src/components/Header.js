// props & PropTypes example
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
    render() {
        console.log('items', this.props.items);

        return (
        <div>
                {this.props.items.map((item, index) => 
                    <a key={index} href={item.link}>{item.label}</a>
                )}
        </div>
        );
    }
}

Header.propTypes = {
    items: PropTypes.array.isRequired
}

export default Header;