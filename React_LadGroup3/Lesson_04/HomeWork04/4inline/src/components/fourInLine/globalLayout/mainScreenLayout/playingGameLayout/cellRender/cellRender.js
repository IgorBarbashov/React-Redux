import React, { Component} from "react";
import "./cellRender.css";

class CellRender extends Component {

    setCellStyle = (player) => {
        let currentClass = "cell size" + 
            this.props.fieldSize.maxFieldColumn + this.props.fieldSize.maxFieldRows;
        
        if (player === 99) {
            player = this.props.currentPlayer;
        }
        
        switch (player) {
            case 1:
                currentClass += " player1";
                break;
            case 2:
                currentClass += " player2";
                break;
            case 3:
                currentClass += " player3";
                break;
            case 11:
            case 12:
            case 13:
                currentClass += " winner";
                break;
            // case 99:
            //     currentClass += " ai-animation";
            //     break;
            default: break;
        }
        return currentClass;
    }
    
    render () {
        return (
            <div className={ this.setCellStyle(this.props.cell) }>
                {/* { (this.props.cell > 10) ? (this.props.cell - 10) : this.props.cell } */}
            </div>
        );
    }
}

export default CellRender;