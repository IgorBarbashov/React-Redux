import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import FooterLayout from "./footerLayout/footerLayout";
import HeaderLayout from "./headerLayout/headerLayout";
import MainScreenLayout from "./mainScreenLayout/mainScreenLayout";
import "./style.css";

class GlobalLayout extends Component {

constructor() {
  super();
    this.state = {
      field: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ],
      
      fieldSize: {
        maxFieldColumn: 7, // первый индекс в массиве
        maxFieldRows: 6 // второй индекс в массиве
      },
  
      players: {
        numberOfPlayers:2,
        currentPlayer: 1,
        playersArr: [
            {id: 1, name: "Игрок1", wins: 0, type: 1, status: "play"}, // type: 1 - human, 2 - AI
            {id: 2, name: "Игрок2", wins: 0, type: 1, status: "play"}, // status: play - играет;  off - не играет
            {id: 3, name: "Игрок3", wins: 0, type: 1, status: "off"}  // win - выиграл; lose - сдался
        ]
      },

      linesLength: 4,
      globalRound: 1,
      isGaming: true,
      reloadGame: false,

      // messageText: "игра в самом разгаре...",
      // isWarning: false
      tempSetState: { // это то, что используется в окне установки новых настроек
        numOfPl: 2,   // не перезаписывает основной state пока не будет нажата клавише "Применить"
        fieldSize: {  // т.к. эти настройки могут меняться только в одном окне,
          cols: 7,    // при остальных setSate этот объект обновлять не надо
          rows: 6 },  // а в начале игры он, как и основной state, равен default-значениям
        linesSize: 4,
        playerOneType: 1,
        playerTwoType: 1,
        playerThirdType: 1,
        playerOneName: "Игрок1",
        playerTwoName: "Игрок2",
        playerThirdName: "Игрок3",
      },
      
      // loseModal: false
      isWinModalOpen: false,
      isDrawnGameModalOpen: false
    }
}

isDrawn = () => {
  let zeroCells = 1;
  for (let i = 0; i < this.state.fieldSize.maxFieldColumn; i++) {
    zeroCells *= this.state.field[i][0];
  }
  if (zeroCells !== 0) {
    this.setState( {isGaming: false}, () => {this.drawnGameModalOn()} );
  }
}

drawnGameModalOff = () => {
  this.setState( { isDrawnGameModalOpen: false } );
  this.onClickOnReset(true, true); // победа?, ничья?
}
drawnGameModalOn = () => {
  this.setState({ isDrawnGameModalOpen: true });
}

loseGame = () => {
  const newPlayers = {...this.state.players};
  newPlayers.playersArr[newPlayers.currentPlayer-1].status = "lose";
  this.setState( {players: newPlayers}, this.changePlayer );

  if ( this.isAlone() ) {
    let newIsGamin = false;
    this.setState( {isGaming: newIsGamin}, () => {this.winGameModalOn()} );
  }
}

isAlone = () => {
  let howMuchPlayers = 0;
  for (let i = 0; i < 3; i++) {
    if (this.state.players.playersArr[i].status === "play") {
      howMuchPlayers++;
    }
  }
  return (howMuchPlayers == 1) ? true : false;
}

winGameModalOn = () => {
  this.setState({ isWinModalOpen: true });
}

winGameModalOff = () => {
  this.setState( { isWinModalOpen: false } );
  this.onClickOnReset(true);
}

inputPLayersName = (event) => {
  let newTempSetState = {...this.state.tempSetState};
  switch(event.target.id) {
    case "1":
      newTempSetState.playerOneName = event.target.value;
      break;
    case "2":
      newTempSetState.playerTwoName = event.target.value;
      break;
    case "3":
      newTempSetState.playerThirdName = event.target.value;
      break;
  }
  this.setState( {tempSetState: newTempSetState} );
}

saveSattings = () => {
  let newPls = {...this.state.players};
  newPls.numberOfPlayers = this.state.tempSetState.numOfPl;
  newPls.playersArr[0].type = this.state.tempSetState.playerOneType;
  newPls.playersArr[1].type = this.state.tempSetState.playerTwoType;
  newPls.playersArr[2].type = this.state.tempSetState.playerThirdType;
  newPls.playersArr[0].name = this.state.tempSetState.playerOneName;
  newPls.playersArr[1].name = this.state.tempSetState.playerTwoName;
  newPls.playersArr[2].name = this.state.tempSetState.playerThirdName;

  newPls.playersArr[0].status = "play";
  newPls.playersArr[1].status = "play";
  newPls.playersArr[2].status = (newPls.numberOfPlayers == 3) ? "play" : "off";

  let newFS = {};
  newFS.maxFieldColumn = this.state.tempSetState.fieldSize.cols;
  newFS.maxFieldRows = this.state.tempSetState.fieldSize.rows;
  let newLS = this.state.tempSetState.linesSize;
  this.setState( {fieldSize: newFS, linesLength: newLS, players: newPls}, () => { this.onClickOnReset(false) } );
}

notSaveSattings = () => {
  let newTempState = {};
  newTempState.linesSize = this.state.linesLength;
  newTempState.numOfPl = this.state.players.numberOfPlayers;
  newTempState.fieldSize ={};
  newTempState.fieldSize.cols = this.state.fieldSize.maxFieldColumn;
  newTempState.fieldSize.rows = this.state.fieldSize.maxFieldRows;
  newTempState.playerOneType = this.state.players.playersArr[0].type;
  newTempState.playerTwoType = this.state.players.playersArr[1].type;
  newTempState.playerThirdType = this.state.players.playersArr[2].type;
  newTempState.playerOneName = this.state.players.playersArr[0].name;
  newTempState.playerTwoName = this.state.players.playersArr[1].name;
  newTempState.playerThirdName = this.state.players.playersArr[2].name;
  this.setState ( {tempSetState: newTempState} );
}

changeSettings = (paramName, paramValue, paramExtend) => {

  switch (paramName) {
    case "playersCount":
      if (this.state.tempSetState.numOfPl != paramValue) {
        let newTempState = {...this.state.tempSetState};
        newTempState.numOfPl = paramValue;
        this.setState( {tempSetState: newTempState} );
      }
      break;
    case "fieldSize":
      if (this.state.tempSetState.fieldSize.cols != paramValue) {
        let newTempState = {...this.state.tempSetState};
        newTempState.fieldSize.cols = paramValue;
        newTempState.fieldSize.rows = paramExtend;
        this.setState( {tempSetState: newTempState} );
      }
      break;
    case "lineSize":
      if (this.state.tempSetState.linesSize != paramValue) {
        let newTempState = {...this.state.tempSetState};
        newTempState.linesSize = paramValue;
        this.setState( {tempSetState: newTempState} );
      }
      break;
      case "whoPLay":
        switch(paramValue) {
          case 1:
            if(paramExtend != this.state.tempSetState.playerOneType) {
              let newTempState = {...this.state.tempSetState};
              newTempState.playerOneType = paramExtend;
              this.setState( {tempSetState: newTempState} );
            }
            break;
          case 2:
            if(paramExtend != this.state.tempSetState.playerTwoType) {
              let newTempState = {...this.state.tempSetState};
              newTempState.playerTwoType = paramExtend;
              this.setState( {tempSetState: newTempState} );
            }
            break;
          case 3:
            if(paramExtend != this.state.tempSetState.playerThirdType) {
              let newTempState = {...this.state.tempSetState};
              newTempState.playerThirdType = paramExtend;
              this.setState( {tempSetState: newTempState} );
            }
            break;
        }
      break;
    defalt: break;
  }

}

makeMove = (columnNuber) => {
  if (!this.state.isGaming) return;

  // проверяем - есть ли в колонке свободные ячейки    
  let index = this.state.field[columnNuber].lastIndexOf(0);
  if (index === -1) {
    return;
  }

  // обновляем состояние поля (кладем фишку)
  let currentPlayer = this.state.players.currentPlayer;
  let newField = [...this.state.field];
  newField[columnNuber][index] = currentPlayer;
  this.setState( {field : newField} );
  
  // ищем линию из 4-х или более фишек
  let winLine = this.isWinSecond(columnNuber, index, currentPlayer);

  if (winLine.length >= this.state.linesLength) { // если нашли победную линию

    for (let i = 0; i < winLine.length; i ++) { // выделим ее красным цветом
      newField[winLine[i].column][winLine[i].index] += 10;
    }

    let newIsGamin = false; // и остановить игру
    this.setState( {field: newField, isGaming: newIsGamin} ); // messageText: newMessageText,

    this.winGameModalOn(); 

    return;
  }
  // меняем игрока
  this.isDrawn();
  this.changePlayer();
}

changePlayer = () => {
  let newPlayer = this.state.players;

  do {
    newPlayer.currentPlayer++;
    if (newPlayer.currentPlayer > newPlayer.numberOfPlayers) {
      newPlayer.currentPlayer = 1; }
  } while ( newPlayer.playersArr[newPlayer.currentPlayer-1].status != "play" );

  this.setState( {players : newPlayer} );
}

onClickOnReset = (isWin, isDrawn) => {
  // во всех трех ("player.Сбросить счет", "Сохранить настройки", "Победа") вызовах
  let newPlayer = {...this.state.players};
  
  newPlayer.playersArr[newPlayer.currentPlayer-1].wins++;
  
  newPlayer.playersArr[0].status = "play";
  newPlayer.playersArr[1].status = "play";
  newPlayer.playersArr[2].status = (newPlayer.numberOfPlayers == 3) ? "play" : "off";
  
  let newIsGaming = true;
  let newField1 = this.createNewField();
    
  // всегда (но если не победа позже сбрасываем), получается, что инкремент только когда победа
  let newGlobalRound = ++this.state.globalRound;

  // только при вызове из "player.Сбросить счет",  "Сохранить настройки"
  if (isWin===false) {
    newPlayer.playersArr[0].wins = 0;
    newPlayer.playersArr[1].wins = 0;
    newPlayer.playersArr[2].wins = 0;

    newPlayer.currentPlayer = 1;

    newGlobalRound = 1;
  }

  // ничья
  if (isDrawn === true) {
    newPlayer.playersArr[newPlayer.currentPlayer-1].wins--;
    newPlayer.currentPlayer = 1;
  }
  
  // всегда
  this.setState (
    { field: newField1,
      players: newPlayer,
      isGaming: newIsGaming,
      globalRound: newGlobalRound,
      reloadGame: true
    }
  );

}

createNewField = () => {
  const newField = [];

  for (let i = 0; i < this.state.fieldSize.maxFieldColumn; i++) {
    newField.push([]);
    for (let j = 0; j < this.state.fieldSize.maxFieldRows; j++) {
      newField[i].push(0);
    }
  }

  return newField;
}

isWinSecond = (beginColumn, beginIndex, currentPlayer) => {
  let line = this.checkLineInDirectionSecond (beginColumn, beginIndex, currentPlayer, 1, 0);
  if (line.length >= 4) return line;
  
  line = this.checkLineInDirectionSecond (beginColumn, beginIndex, currentPlayer, 1, 1);
  if (line.length >= 4) return line;
  
  line = this.checkLineInDirectionSecond (beginColumn, beginIndex, currentPlayer, 0, 1);
  if (line.length >= 4) return line;
  
  line = this.checkLineInDirectionSecond (beginColumn, beginIndex, currentPlayer, -1, 1);
  return line;
}

checkLineInDirectionSecond = (beginColumn, beginIndex, currentPlayer, dC, dI) => {
  let maxColumn = this.state.field.length - 1;
  let maxIndex = this.state.field[0].length -1;
  let isForward = true; // флаг - можем ли мы двигаться по фишкам в заданном в параметрах функции направлении
  let isReverse = true; // аналогичный флаг - только показывает можем ли мы двигаться в обратном направлении
  const line = [ {column: beginColumn, index: beginIndex} ] // изначально в линии-пбедительнице только одна фишка, с которой и начинаем
  let iteratorForward = 1; // итератор движения вперед
  let iteratorReverse = -1; // итератор движения назад

  while (isForward || isReverse) {
    if (isForward) { // если можем идти в прямом направлении
      let nextColumn = beginColumn + dC * iteratorForward; // следующая колонка
      let nextIndex = beginIndex + dI * iteratorForward; // следующий индекс в колонке
        if ( nextColumn >= 0 && nextColumn <= maxColumn && nextIndex >= 0 && nextIndex <= maxIndex ) { // если новые индексы на этой итерации не выходят за границы массива
          if ( this.state.field[nextColumn][nextIndex] === currentPlayer ) { // если новая фишка того же цвета
            line.push( {column: nextColumn, index: nextIndex} ); // добавляем эту фишку в массив линии
            iteratorForward++; // увеличиваем итератор
          } else isForward = false;
        } else isForward = false;
    }

    if (isReverse) { // аналогично, только с отрицательным итератором
      let nextColumn = beginColumn + dC * iteratorReverse;
      let nextIndex = beginIndex + dI * iteratorReverse;
        if ( nextColumn >= 0 && nextColumn <= maxColumn && nextIndex >= 0 && nextIndex <= maxIndex ) {
          if ( this.state.field[nextColumn][nextIndex] === currentPlayer ) {
            line.push( {column: nextColumn, index: nextIndex} );
            iteratorReverse--;
          } else isReverse = false;
        } else isReverse = false;
    }
  }

  return line;
}

  render() {
    // alert("GlobalLayout");
  
    return (
      <BrowserRouter>
        <div className="globalLayout">
     
          <Route
            path="/"
            render={props =>
              <HeaderLayout
                {...props}
                gameState={this.state}
              />
            }
          />

          <Route
            path="/"
            render = {props =>
              <MainScreenLayout
                {...props}
                myState={this.state}
                makeMove={this.makeMove}
                resetGame={this.onClickOnReset}
                saveSattings={this.saveSattings}
                notSaveSattings={this.notSaveSattings}
                changeSettings={this.changeSettings}
                inputPLayersName={this.inputPLayersName}
                loseGame={this.loseGame}
                winGameModalOff={this.winGameModalOff}
                drawnGameModalOff={this.drawnGameModalOff}
              />
            }
          />

          <Route
            path="/"
            render = {props =>
              <FooterLayout
                {...props}
              />
            }
          />

        </div>
      </BrowserRouter>
    );
  }
}

export default GlobalLayout;