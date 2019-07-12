import React, { Component} from "react";
import "./cell.css";

class Cell extends Component {
    
    setCellStyle (player) {
        switch (player) {
            case 1:
                return "cell player1";
            case 2:
                return "cell player2";
            case 11:
            case 12:
                return "cell winner";
            default:
                return "cell";
        }
    }
    
    render () {
        return (
            <div className={ this.setCellStyle(this.props.cell) }>
                { (this.props.cell > 10) ? (this.props.cell - 10) : this.props.cell }
            </div>
        );
    }
}

export default Cell;