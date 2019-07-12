import React, { Component } from "react";
import Column from "../column";
import "./Table.css";

class Table extends Component {

    renderColumn = (column, i) => {
        return (
            <Column
                key={i}
                column={column}
                onClick = { () => this.props.onClick(i)}
            />
        );
    }

    render () {
        return (
            <div className="table"> 
                { this.props.field.map(this.renderColumn) }
            </div>
        );
    }
}

export default Table;