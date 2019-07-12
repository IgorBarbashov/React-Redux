import React, { Component } from "react";
import "./Resetgame.css";

class ResetGame extends Component {
    render () {
        let currentClassName = this.props.isGaming ? "resetgame" : "resetgame resetgamealert";



        return (
            <div
                className={currentClassName}
                onClick={this.props.onClick}>
                
                    Начать новую игру

            </div>
        );
    }
}

export default ResetGame;