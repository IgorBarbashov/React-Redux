import React, { Component} from "react";
import "./style.css"

class GameButtonWithoutLink extends Component {
    
    state = {
        currentClas: "green-button",
        notActiveButtonClass: "green-button",
        activeButtonClass: "green-button pointer",
    }
    
    mouseEnternOnItem = () => {
        this.setState( {currentClas: this.state.activeButtonClass} );
    }

    mouseLeaveFromItem = () => {
        this.setState( {currentClas: this.state.notActiveButtonClass} );
    }


    render() {
        return (
            <div
                className={this.state.currentClas}
                onClick={this.props.buttonFunc}
                onMouseEnter={ this.mouseEnternOnItem }
                onMouseLeave={ this.mouseLeaveFromItem }
            >
                {this.props.buttonName}
            </div>
        );
    }
}

export default GameButtonWithoutLink;