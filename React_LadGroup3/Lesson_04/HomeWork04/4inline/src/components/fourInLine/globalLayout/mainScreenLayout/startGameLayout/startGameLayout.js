import React, { Component } from 'react';
// import { Redirect } from "react-router-dom";
import GameButton from "../../gameButton/gameButton";
import "./style.css"

class StartGameLayout extends Component {

    render() {
    // alert("StartGameLayout");
    // const curPath = this.props.location.pathname ? this.props.location.pathname : "/";

    // const curIsLink = (!this.props.location.state || !this.props.location.state.isLink) ? false : true;
    // if (!curIsLink) { return <Redirect to="/error" />; }

        return (
            <div className="sg-layout">
            {/* <div className="comp-name-and-data">StartGameLayout (/ - {curPath}):</div> */}
            {/* <div className="comp-name-and-data">Мы попали сюда по ссылке Link?: {""+curIsLink} (isLink)</div> */}
    
    
                
                <div>
                    {/* <Link to={{ pathname: "/game", state: {isLink: true} }}> */}
                        {/* <div className="temp-text">
                        Длина линии: {this.props.myState.linesLength}<br/>
                        Размер поля: {this.props.myState.fieldSize.maxFieldColumn}x{this.props.myState.fieldSize.maxFieldRows}<br/>
                        Число игроков: {this.props.myState.players.numberOfPlayers}<br/>
                        Игрок: {this.props.myState.players.playersArr[0].id} : {this.props.myState.players.playersArr[0].name} : {this.props.myState.players.playersArr[0].wins}<br/>
                        Игрок: {this.props.myState.players.playersArr[1].id} : {this.props.myState.players.playersArr[1].name} : {this.props.myState.players.playersArr[1].wins}<br/>
                        Игрок: {this.props.myState.players.playersArr[2].id} : {this.props.myState.players.playersArr[2].name} : {this.props.myState.players.playersArr[2].wins}<br/>
                        Раунд: {this.props.myState. globalRound}<br/>
                        </div> */}



                        
                        <GameButton
                            buttonName="Начать игру"
                            buttonPath="/game"
                        />
                    {/* </Link> */}
                </div>
                {/* <div>
                    <Link to={{ pathname: "/settings", state: {isLink: true} }}>
                        Задать начальные настройки (это проверяемый Link)
                    </Link>

                    <GameButton
                        buttonName="Настройки"
                        buttonPath="/settings"
                    />


                </div> */}


                
            </div>
        );
    }
}

export default StartGameLayout;