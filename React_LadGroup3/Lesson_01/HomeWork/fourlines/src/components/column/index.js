import React, { Component } from "react";
import Cell from "../cell";

class Column extends Component {

    renderCell (cell, i) {
        return (
            <Cell
                key={i}
                cell={cell}
            />
        );
    }

    render () {
        return (
            <div onClick={this.props.onClick} >
                { this.props.column.map(this.renderCell) }
            </div>
        );
    }
}

export default Column;