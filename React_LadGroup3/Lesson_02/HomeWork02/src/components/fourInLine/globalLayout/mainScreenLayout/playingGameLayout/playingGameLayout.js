import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import TableRender from "./tableRender/tableRender";
import ResetGameButton from "./resetGameButton/resetGameButton";
import "./style.css"

class PlayingGameLayout extends Component {
    render() {
    // alert("PlayingGameLayout");
    // const curPath = this.props.location.pathname ? this.props.location.pathname : "/";
    const curIsLink = (!this.props.location.state || !this.props.location.state.isLink) ? false : true;
    if (!curIsLink) { return <Redirect to="/error" />; }
    
        return (
            <div className="playing-game-layout">
            {/* <div className="comp-name-and-data">PlayingGameLayout (/game - {curPath}):"</div> */}
            {/* <div className="comp-name-and-data">Мы попали сюда по ссылке Link?: {""+curIsLink} (isLink)</div> */}



        <div className="left-column">
            {/* вместо этого Link надо сделать кнопку с событие resetGame
            <Link to={{ pathname: "/", state: {isLink: true} }}>
                Начать игру заново (это проверяемый Link)
            </Link> */}
            <ResetGameButton
                resetGame={this.props.resetGame}
            />


        </div>

        {/* <div>
          <Link to={{ pathname: "/settings", state: {isLink: true} }}>
            Перейти к настройкам игры (это проверяемый Link)
          </Link>
        </div> */}


            <div className="rigth-column">
            <TableRender
                field={this.props.myState.field}
                makeMove={this.props.makeMove}
            />
            </div>

                {/* такой вызов здесь почему-то не работает */}
                {/* <Route
                    path="/game"
                    render={props =>
                        <TableRender
                            {...props}
                            field={this.props.field}
                            makeMove={this.props.makeMove}
                        />
                    }
                /> */}
            
            
            </div>
        );
    }
}

export default PlayingGameLayout;