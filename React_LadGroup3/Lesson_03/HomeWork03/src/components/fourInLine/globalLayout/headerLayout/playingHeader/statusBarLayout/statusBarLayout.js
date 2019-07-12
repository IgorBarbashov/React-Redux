import React, { Component } from 'react';
import PlayerInfo from "./playerInfo/playerInfo";
import "./style.css"

class StatusBarLayout extends Component {
    render() {
    const round = this.props.gameState.globalRound;
    const players = this.props.gameState.players.playersArr;
    const numberOfPlayers = this.props.gameState.players.numberOfPlayers;
    const currentPlayer = this.props.gameState.players.currentPlayer;
    
        return (
            <div className="status-bar-layout">
                <div className="sb-header">Игра: {round}</div>
                <div className="player-info">
                    <PlayerInfo currentPlayer={currentPlayer} player={players[0]} />
                    <PlayerInfo currentPlayer={currentPlayer} player={players[1]} />
                    
                    {numberOfPlayers == 3 ?
                    <PlayerInfo currentPlayer={currentPlayer} player={players[2]} /> : "" }

                </div>
            </div>
        );
    }
}

export default StatusBarLayout;