import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import TableRender from "./tableRender/tableRender";
import GameButton from "../../gameButton/gameButton";
import GameButtonWithoutLink from "../../gameButton/gameButtonWithoutLink";
import MyModal from "../../gameModal/gameModal";
import "./style.css"

class PlayingGameLayout extends Component {
    state = {
        isLoseModalOpen: false,
        isDeleteProgressModalOpen: false,
        redirectToMain: false
    }

    loseGameModalOn = () => {
        this.setState({ isLoseModalOpen: true });
    }

    loseGameModalOff = () => {
        this.setState( { isLoseModalOpen: false } );
        this.props.loseGame();
    }

    deleteProgressModalOn = () => {
        this.setState({ isDeleteProgressModalOpen: true });
    }
    deleteProgressModalOff = () => {
        this.props.resetGame(false);
        this.setState( { isDeleteProgressModalOpen: false, redirectToMain: true } );
    }

    render() {
    const playerIndex = this.props.myState.players.currentPlayer-1;
    const playerName = this.props.myState.players.playersArr[playerIndex].name;
    const playerWins = this.props.myState.players.playersArr[playerIndex].wins;
    
        return (
            <div className="playing-game-layout">
            
                { ( this.state.redirectToMain === true ) ?
                    ( <Redirect to={ { pathname: "/", state: {isLink: true} } } /> ) : "" }

                <MyModal
                    isModalOpen={this.state.isLoseModalOpen}
                    modalFunctionOff={this.loseGameModalOff}
                    title="Вы сдались!"
                    content={<><b>{playerName}</b>, вы больше не учавствуете в текущей игре.<br/>
                        Вы сможете продолжить игру в следующем раунде</>}
                />

                <MyModal
                    isModalOpen={this.props.myState.isWinModalOpen}
                    modalFunctionOff={this.props.winGameModalOff}
                    title="Победа!!!"
                    content={playerName + ", поздравляем вас! "+
                        "Теперь у вас " + (playerWins+1) +" побед. Так держать!"}
                />

                <MyModal
                    isModalOpen={this.state.isDeleteProgressModalOpen}
                    modalFunctionOff={this.deleteProgressModalOff}
                    title="Прогресс всей игры сброшен!"
                    content={<>Прогресс текущей игры, а также раунды,<br/>победы игроков будут сброшены.
                        <br/>Вы будете переведены на главный экран</>}
                />

                <MyModal
                    isModalOpen={this.props.myState.isDrawnGameModalOpen}
                    modalFunctionOff={this.props.drawnGameModalOff}
                    title="Ничья!"
                    content={<>Что же - в этот раз победила дружба))
                        <br/>Посмотрим на следующий раунд!</>}
                />
                        
                <div className="left-column">
                    <div className="text-in-play">
                        Выигрывает<br/>линия из<br/>
                        <span className="lines-number">{this.props.myState.linesLength}</span>
                        <br/>ячеек
                    </div>

                    <GameButtonWithoutLink
                        buttonFunc={this.loseGameModalOn}
                        buttonName="Сдаться"
                    />

                    <GameButtonWithoutLink
                        buttonFunc={this.deleteProgressModalOn}
                        buttonName="Сбросить счет"
                    />
                </div>

                <div className="rigth-column">
                    <TableRender
                        field={this.props.myState.field}
                        makeMove={this.props.makeMove}
                    />
                </div>
            </div>
        );
    }
}

export default PlayingGameLayout;