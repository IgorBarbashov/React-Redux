import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import "./style.css"
import GameButtonWithoutLink from '../../gameButton/gameButtonWithoutLink';
import MyModal from "../../gameModal/gameModal";

class SettingsLayout extends Component {
  state = {
    isAcceptSettingsModalOpen: false,
    isBackToGameModalOpen: false,
    redirectToMain: false,
    redirectToGame: false
  }

  acceptSettingsModalOn = () => {
    this.setState({ isAcceptSettingsModalOpen: true });
  }
  acceptSettingsModalOff = () => {
    this.props.saveSattings();
    this.setState( { isAcceptSettingsModalOpen: false, redirectToMain: true} );
  }

  backToGameModalOn = () => {
    this.setState({ isBackToGameModalOpen: true });
  }
  backToGameModalOff = () => {
    this.props.notSaveSattings();
    this.setState( { isBackToGameModalOpen: false, redirectToGame: true} );
  }

  someThingToCahngeInSetting = (paramName, paramValue, paramExtend) => {
    this.props.changeSettings(paramName, paramValue, paramExtend);
  }
  
  render() {

    const curIsLink = (!this.props.location.state || !this.props.location.state.isLink) ? false : true;
    if (!curIsLink) { return <Redirect to="/error" />; }


    let nomOfPl = this.props.myState.tempSetState.numOfPl;
    let lineLen = this.props.myState.tempSetState.linesSize;
    let cols = this.props.myState.tempSetState.fieldSize.cols;

    let playerOne = this.props.myState.players.playersArr[0];
    let playerTwo = this.props.myState.players.playersArr[1];
    let playerThird = this.props.myState.players.playersArr[2];

    let playerOneName = this.props.myState.tempSetState.playerOneName;
    let playerTwoName = this.props.myState.tempSetState.playerTwoName;
    let playerThirdName = this.props.myState.tempSetState.playerThirdName;

    let playerOneType = this.props.myState.tempSetState.playerOneType;
    let playerTwoType = this.props.myState.tempSetState.playerTwoType;
    let playerThirdType = this.props.myState.tempSetState.playerThirdType;

        return (
            <div className="settings-layout">

            { ( this.state.redirectToMain === true ) ?
                ( <Redirect to={ { pathname: "/", state: {isLink: true} } } /> ) : "" }

            { ( this.state.redirectToGame === true ) ?
                ( <Redirect to={ { pathname: "/game", state: {isLink: true} } } /> ) : "" }

            <div className="all-width">

              <MyModal
                  isModalOpen={this.state.isAcceptSettingsModalOpen}
                  modalFunctionOff={this.acceptSettingsModalOff}
                  title="Настройки сохранены!"
                  content={<>Все изменения в настройках применены.<br/>
                    Вы будете перенаправлены на главный экран.</>}
              />

              <MyModal
                  isModalOpen={this.state.isBackToGameModalOpen}
                  modalFunctionOff={this.backToGameModalOff}
                  title="Не применяем настройки!"
                  content={<>Все настройки останутся прежними.<br/>Продолжаем игру!</>}
              />

            <div className="half-width">
              <div className="cell-in-settings">
                <div className="in-cell-argument">Число игроков</div>
                <div 
                  className= { nomOfPl===2 ? "in-cell-value active-element" : "in-cell-value" }
                  onClick = { () => { this.someThingToCahngeInSetting("playersCount", 2); } }
                >2</div>
                <div
                  className= { nomOfPl===3 ? "in-cell-value active-element" : "in-cell-value" }
                  onClick = { () => { this.someThingToCahngeInSetting("playersCount", 3); } }
                >3</div>
              </div>

              <div className="cell-in-settings">
                <div className="in-cell-argument">Размер поля</div>
                <div
                  className= { cols===7 ? "in-cell-value active-element" : "in-cell-value" }
                  onClick = { () => { this.someThingToCahngeInSetting("fieldSize", 7, 6); } }
                >7x6</div>
                <div
                  className= { cols===8 ? "in-cell-value active-element" : "in-cell-value" }
                  onClick = { () => { this.someThingToCahngeInSetting("fieldSize", 8, 7); } }
                >8x7</div>
                <div
                  className= { cols===9 ? "in-cell-value active-element" : "in-cell-value" }
                  onClick = { () => { this.someThingToCahngeInSetting("fieldSize", 9, 7); } }
                >9x7</div>
                <div
                  className= { cols===10 ? "in-cell-value active-element" : "in-cell-value" }
                  onClick = { () => { this.someThingToCahngeInSetting("fieldSize", 10, 7); } }
                >10x7</div>
              </div>
            
              <div className="cell-in-settings">
                <div className="in-cell-argument">Размер линии</div>
                <div
                  className= { lineLen===4 ? "in-cell-value active-element" : "in-cell-value" }
                  onClick = { () => { this.someThingToCahngeInSetting("lineSize", 4); } }
                >4</div>
                <div
                  className= { lineLen===5 ? "in-cell-value active-element" : "in-cell-value" }
                  onClick = { () => { this.someThingToCahngeInSetting("lineSize", 5); } }
                >5</div>
                <div
                  className= { lineLen===6 ? "in-cell-value active-element" : "in-cell-value" }
                  onClick = { () => { this.someThingToCahngeInSetting("lineSize", 6); } }
                >6</div>
              </div>
          </div>

          <div className="half-width">
            <div className="cell-in-settings">
              <div className="in-cell-argument">
                Игрок 1 ({playerOne.status}) : 
                <input
                  id="1"
                  type="text"
                  value={playerOneName}
                  onChange={this.props.inputPLayersName}
                />
              </div>
              <div
                className= { playerOneType===1 ? "in-cell-value active-element" : "in-cell-value" }
                onClick = { () => { this.someThingToCahngeInSetting("whoPLay", 1, 1); } }
              >Human</div>
              <div
                className= { playerOneType===2 ? "in-cell-value active-element" : "in-cell-value" }
                onClick = { () => { this.someThingToCahngeInSetting("whoPLay", 1, 2); } }
              >AI</div>
            </div>

            <div className="cell-in-settings">
              <div className="in-cell-argument">
                Игрок 2 ({playerTwo.status}) : 
                <input
                  id="2"
                  type="text"
                  value={playerTwoName}
                  onChange={this.props.inputPLayersName}
                />
              </div>
              <div
                className= { playerTwoType===1 ? "in-cell-value active-element" : "in-cell-value" }
                onClick = { () => { this.someThingToCahngeInSetting("whoPLay", 2, 1); } }
                >Human</div>
              <div
                className= { playerTwoType===2 ? "in-cell-value active-element" : "in-cell-value" }
                onClick = { () => { this.someThingToCahngeInSetting("whoPLay", 2, 2); } }
              >AI</div>
            </div>
            
            <div className="cell-in-settings">
              <div className="in-cell-argument">
                Игрок 3 ({playerThird.status}) : 
                <input
                  id="3"
                  type="text"
                  value={playerThirdName}
                  onChange={this.props.inputPLayersName}
                />
              </div>
              <div
                className= { playerThirdType===1 ? "in-cell-value active-element" : "in-cell-value" }
                onClick = { () => { this.someThingToCahngeInSetting("whoPLay", 3, 1); } }
              >Human</div>
              <div
                className= { playerThirdType===2 ? "in-cell-value active-element" : "in-cell-value" }
                onClick = { () => { this.someThingToCahngeInSetting("whoPLay", 3, 2); } }
              >AI</div>
            </div>
          </div>

        </div>

        <GameButtonWithoutLink
          buttonFunc={this.acceptSettingsModalOn}
          buttonName="Применить"
        />

        <GameButtonWithoutLink 
          buttonFunc={this.backToGameModalOn}
          buttonName="В игру"
        />
      </div>
    );
  }
}

export default SettingsLayout;