import React, { Component } from "react";
import ColumnRender from "../columnRender/columnRender";
import "./tableRender.css";

class TableRender extends Component {

    renderColumn = (column, i) => {
        return (
            <ColumnRender
                key={i}
                column={column}
                onClick = { () => this.props.makeMove(i)}
            />
        );
    }

    render () {
        // alert("TableRender");

        return (
            <div className="table"> 
                { this.props.field.map(this.renderColumn) }
            </div>
        );
    }
}

export default TableRender;