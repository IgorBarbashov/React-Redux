import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import TableRender from "./tableRender/tableRender";
import GameButtonWithoutLink from "../../gameButton/gameButtonWithoutLink";
import MyModal from "../../gameModal/gameModal";
import "./style.css"

class PlayingGameLayout extends Component {

    state = {
        isLoseModalOpen: false,
        isDeleteProgressModalOpen: false,
        redirectToMain: false
    }

    // **********
//     componentDidUpdate() {
//         // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - componentDidUpdate (enter)"); // *************************************************************

//         alert("componentDidUpdate - PlayingGameLayout !!!");  

//         // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - componentDidUpdate (enter)"); // *************************************************************
// }

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

    const curIsLink = (!this.props.location.state || !this.props.location.state.isLink) ? false : true;
    if (!curIsLink) { return <Redirect to="/error" />; }

    const playerIndex = this.props.myState.players.currentPlayer-1;
    const playerName = this.props.myState.players.playersArr[playerIndex].name;
    const playerWins = this.props.myState.players.playersArr[playerIndex].wins;
    
    // if (this.props.myState.players.playersArr[this.props.myState.players.currentPlayer-1].type === 2) {
    //     this.props.makeAiMove(); }

        return (
            <div className="playing-game-layout">

                { ( this.props.myState.isRedirectToMain === true ) ?
                    <Redirect to={ { pathname: "/", state: {isLink: true} } } /> : "" }
            
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
                    firstButton={ {name: "Следующий раунд" } }
                    secondButton={ {name: "Сбросить счет", func: ()=>alert("На кнопку нажали") } }
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
                    firstButton={ {name: "Следующий раунд" } }
                    secondButton={ {name: "Сбросить счет", func: ()=>alert("На кнопку нажали") } }
                />
                        
                <div className="left-column">
                    <div className="text-in-play">
                        Выигрывает<br/>линия из<br/>
                        <span className="lines-number">{this.props.myState.linesLength}</span>
                        <br/>ячеек
                    </div>

                    <GameButtonWithoutLink
                        buttonFunc={this.props.myState.isGaming ? this.loseGameModalOn : null}
                        buttonName="Сдаться"
                    />

                    <GameButtonWithoutLink
                        buttonFunc={this.props.myState.isGaming ? this.deleteProgressModalOn : null}
                        buttonName="Сбросить счет"
                    />
                </div>

                <div className="rigth-column">
                    <TableRender
                        field={this.props.myState.field}
                        fieldSize={this.props.myState.fieldSize}
                        // currentPlayerType={this.props.myState.players.playersArr[this.props.myState.players.currentPlayer-1].type}
                        makeMove={this.props.makeMove}
                        // makeAiMove={this.props.makeAiMove}
                        currentPlayer={this.props.myState.players.currentPlayer}
                        // checkForFirstStep={this.props.checkForFirstStep}
                        firstStepModalOff={this.props.firstStepModalOff}
                        isFirstStepModalOpen={this.props.isFirstStepModalOpen}
                        globalRound={this.props.myState.globalRound}
                    />
                </div>
            </div>
        );
    }
}

export default PlayingGameLayout;