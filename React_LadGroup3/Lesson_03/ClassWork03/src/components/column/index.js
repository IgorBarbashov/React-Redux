import React, { Component } from 'react';
import Cell from '../cell';


class Column extends Component {
    renderCell(el, i) {
        
        return <Cell  key={i} data={el} />
    }


render() {
        return (
            <div onClick={this.props.onClick}>
              {this.props.data.map(this.renderCell)}

            </div>
        );
    }
}

export default Column;