import React, { Component } from "react";
import CellRender from "../cellRender/cellRender";
import "./columnRender.css";

class ColumnRender extends Component {

    renderCell (cell, i) {
        return (
            <CellRender
                key={i}
                cell={cell}
            />
        );
    }

    render () {
        return (
            <div
                onClick={this.props.onClick}
                className="render-column"
            >
                { this.props.column.map(this.renderCell) }
            </div>
        );
    }
}

export default ColumnRender;