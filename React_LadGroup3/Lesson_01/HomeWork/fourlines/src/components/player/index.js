import React, { Component } from "react";
import "./Players.css";

class Player extends Component {

    getClassForAll = (who, current) => {
        const playerOne = this.props.players.playersArr[0];
        const playerTwo = this.props.players.playersArr[1];
        let curClass = "allPlayers";
        let curText = "игрок ";

        switch (who) {
            case 1:
                curClass += " playerOne";
                curText += playerOne.id + " - " + playerOne.name;
                break;
            case 2:
                curClass += " playerTwo";
                curText += playerTwo.id + " - " + playerTwo.name;
        }
        
        if (who === current) {
            curClass += " currentPlayer"; 
            curText = "Ходит " + curText;
        }
        
        return <div className={curClass}>{curText}</div>;
    }

    render() {
        const currentPlayer = this.props.players.currentPlayer;

        return (
            <div className="players">
                {this.getClassForAll (1, currentPlayer)}
                {this.getClassForAll (2, currentPlayer)}
            </div>
        );
    }
}

export default Player;