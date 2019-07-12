import React, { Component } from "react";
import "./style.css";

class PlayerInfo extends Component {
    getClassName = () => {
        return (this.props.currentPlayer == this.props.player.id) ?
            "player-name current-"+this.props.player.id : "player-name";
    }

    render() {
        return (
            <div className={this.getClassName()}>
                {this.props.player.name}
                <div className="wins">Побед: {this.props.player.wins}</div>
            </div>
        );
    }
}

export default PlayerInfo;