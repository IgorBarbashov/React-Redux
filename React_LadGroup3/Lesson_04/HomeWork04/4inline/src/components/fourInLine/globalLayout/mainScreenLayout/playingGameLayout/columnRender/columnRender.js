import React, { Component } from "react";
import CellRender from "../cellRender/cellRender";
import "./columnRender.css";

class ColumnRender extends Component {

    state = {
        columnClass: "render-column"
    }

    renderCell = (cell, i) => {
        return (
            <CellRender
                key={i}
                cell={cell}
                fieldSize = {this.props.fieldSize}
                currentPlayer={this.props.currentPlayer}
            />
        );
    }

    enterMouseOnColumn = () => {
        this.setState( {columnClass: "render-column active"} );
    }
    
    leaveMouseFromColumn = () => {
        this.setState( {columnClass: "render-column"} );
    }

    render () {
        // if (this.props.currentPlayerType === 2) {
        //     alert("Ход AI");
        // }

        return (
            <div
                onClick={this.props.onClick}
                // onDoubleClick={ (e) => { e.preventDefault(); console.log("Prevetn"); }  }
                className={this.state.columnClass}
                onMouseEnter={this.enterMouseOnColumn}
                onMouseLeave={this.leaveMouseFromColumn}
            >
                { this.props.column.map(this.renderCell) }
            </div>
        );
    }
}

export default ColumnRender;