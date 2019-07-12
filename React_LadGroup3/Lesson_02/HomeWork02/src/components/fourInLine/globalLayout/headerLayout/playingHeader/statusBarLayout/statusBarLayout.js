import React, { Component } from 'react';
import PlayerInfo from "./playerInfo/playerInfo";
// import { Redirect } from "react-router-dom";
import "./style.css"

class StatusBarLayout extends Component {
    render() {
    const round = this.props.gameState.globalRound;
    const players = this.props.gameState.players.playersArr;
    const numberOfPlayers = this.props.gameState.players.numberOfPlayers;
    const currentPlayer = this.props.gameState.players.currentPlayer;
    // alert("StatusBarLayout");
    // const curPath = this.props.location.pathname ? this.props.location.pathname : "/";
    // const curIsLink = (!this.props.location.state || !this.props.location.state.isLink) ? false : true;
    // if (!curIsLink) { return <Redirect to="/error" />; }
    
        return (
            <div className="status-bar-layout">
            {/* <div className="comp-name-and-data">StatusBarLayout (/game - {curPath}):</div> */}
            {/* <div className="comp-name-and-data">Мы попали сюда по ссылке Link?: {""+curIsLink} (isLink)</div> */}
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