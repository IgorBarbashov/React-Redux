import React, { Component } from "react";
import "./Statusbar.css";
import Player from "../player";
import ResetGame from "../resetgame";

class StatusBar extends Component {
    render () {
        return (
            <div className="statusbar">

                <Player
                    players={this.props.players}
                />
                
                <ResetGame
                    onClick={this.props.onClick}
                    isGaming={this.props.isGaming}
                />

            </div>
        );
    }
}

export default StatusBar;