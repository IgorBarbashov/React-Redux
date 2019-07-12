import React, { Component } from "react";
import "./style.css";

class PlayerInfo extends Component {
    getClassName = () => {
        let currentCssClass = (this.props.player.status == "lose" ?
            "lose-game " : "");
        
        return currentCssClass + ((this.props.currentPlayer == this.props.player.id) ?
            "player-name current-" + this.props.player.id : "player-name");
    }

    render() {
        return (
            <div className={this.getClassName()}>
                {this.props.player.name} ({this.props.player.status})
                <div className="wins">Побед: {this.props.player.wins}</div>
            </div>
        );
    }
}

export default PlayerInfo;