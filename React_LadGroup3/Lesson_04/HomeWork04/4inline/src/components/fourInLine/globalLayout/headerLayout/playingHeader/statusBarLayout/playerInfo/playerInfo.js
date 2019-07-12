import React, { Component } from "react";
import AIimage from "../../../../sprites/AIimage/AIimage";
import HumanImage from "../../../../sprites/HumanImage/HumanImage";
import "./style.css";

class PlayerInfo extends Component {
    getClassName = () => {
        let currentCssClass = (this.props.player.status === "lose" ?
            "lose-game " : "");
        
        return currentCssClass + ((this.props.currentPlayer === this.props.player.id) ?
            "player-name current-" + this.props.player.id : "player-name");
    }

    render() {
        return (
            <div className={this.getClassName()}>
                <div className="inner-div">
                    { this.props.player.type === 2 ? 
                         <AIimage size="35" color="white"/> : <HumanImage size="35" color="white"/> } 
                </div>
                <div className="inner-div">
                    {this.props.player.name}
                    {/* <div className="wins"> */}
                    <div>Побед: {this.props.player.wins}</div>
                </div>
            </div>
        );
    }
}

export default PlayerInfo;