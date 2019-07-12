import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
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
      isDrawnGameModalOpen: false,
      isFirstStepModalOpen: true,
      isAIStepOn: false,
      gameSpeed: 50,
      isRedirectToMain: false
    }
}

// **********
componentWillUnmout () {
  alert("componentWillUnmout");
}

// **********
firstStepModalOn = () => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - firstStepModalOn (enter)"); // *************************************************************  
  this.setState( { isFirstStepModalOpen: true, isGaming: false } );
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - firstStepModalOn (exit)"); // *************************************************************  
}

// **********
firstStepModalOff = () => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - firstStepModalOff (enter)"); // *************************************************************  
  // this.setState( { isFirstStepModalOpen: false } );
  this.setState( { isFirstStepModalOpen: false, isGaming: true }, ()=>this.checkForFirstStep() );
  
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - firstStepModalOff (exit)"); // *************************************************************  
}

// **********
checkForFirstStep = () => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - checkForFirstStep (enter)"); // *************************************************************  
    // console.log(this.stackLevelPrint(this.stackLevel) + "Проверка на первый ход: " + this.state.players.playersArr[this.state.players.currentPlayer-1].name + " : " +
    //   (this.state.players.playersArr[this.state.players.currentPlayer-1].type === 2 ? "AI" : "не AI") );

// alert("Здесь будет можальное окн ос сномером раунда ");

    if (this.state.players.playersArr[this.state.players.currentPlayer-1].type === 2) {
      this.makeAiMove();
    }

    // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - checkForFirstStep (exit)"); // *************************************************************  
}

// **********
stackLevelPrint = (count) => {
  let str="";
  for (let i = 0; i < count; i++) {
    str +=  "--";
  }
  return (str+"> ");
}

// **********
componentDidMount() {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - componentDidMount-GlobalLayout (enter)"); // *************************************************************
  // console.log(this.stackLevelPrint(++this.stackLevel) + "Статус текущего игрока: " + this.state.players.playersArr[this.state.players.currentPlayer-1].status); // *************************************************************  
  this.stackLevel = 1;
// alert("GlobalLayout - componentDidMount !!!!!!!!!!!!!!!!");
  // if (this.state.players.playersArr[this.state.players.currentPlayer-1].status === 2) {

  // }

  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - componentDidMount-GlobalLayout (exit)"); // *************************************************************
}

// **********
componentDidUpdate() {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - componentDidUpdate (enter)"); // *************************************************************

  // alert("componentDidUpdate - GlobalLayer !!!");  
  // this.checkForFirstStep();
  if (this.state.isRedirectToMain) {
    this.setState( {isRedirectToMain: false} );
  }

  // alert( this.state.isRedirectToMain ? "Сейчас как подем на главную" : "Не будем редиректиться" );

  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - componentDidUpdate (enter)"); // *************************************************************
}

// **********
isDrawn = () => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - isDrawn (enter)"); // *************************************************************
  let zeroCells = 1;
  for (let i = 0; i < this.state.fieldSize.maxFieldColumn; i++) {
    zeroCells *= this.state.field[i][0];
  }
  if (zeroCells !== 0) {
    this.setState( {isGaming: false}, () => { this.drawnGameModalOn(); } );
    // console.log(this.stackLevelPrint(this.stackLevel) + "################################################################");
    // console.log( this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - isDrawn (exit)"); // *************************************************************
    return true;
  }
  // console.log( this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - isDrawn (exit)"); // *************************************************************
  return false;
}

// **********
drawnGameModalOff = (callback) => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - drawnGameModalOff (enter)"); // *************************************************************
  // this.setState( { isDrawnGameModalOpen: false } );

  if(callback) {
    // callback();
    this.setState( { isDrawnGameModalOpen: false, isRedirectToMain: true } );
    this.onClickOnReset(false, false); // сброс
    
    // !!! здесь надо как-то сделать Redirect на галвную !!!
    // <Redirect to={ { pathname: "/", state: {isLink: true} } } />

  } else {
    this.setState( { isDrawnGameModalOpen: false} );
    // this.onClickOnReset(true, true, this.checkForFirstStep); // победа?, ничья?
    this.onClickOnReset(true, true); // победа?, ничья?
  }
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - drawnGameModalOff (exit)"); // *************************************************************
}

// **********
drawnGameModalOn = () => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - drawnGameModalOn (enter)"); // *************************************************************
  this.setState({ isDrawnGameModalOpen: true });
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - drawnGameModalOn (exit)"); // *************************************************************
}

// **********
loseGame = () => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - loseGame (enter)"); // *************************************************************
  const newPlayers = {...this.state.players};
  newPlayers.playersArr[newPlayers.currentPlayer-1].status = "lose";
  this.setState( {players: newPlayers}, this.changePlayer );

  if ( this.isAlone() ) {
    let newIsGamin = false;
    this.setState( {isGaming: newIsGamin}, () => {this.winGameModalOn()} );
  }
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - loseGame (exit)"); // *************************************************************
}

// **********
isAlone = () => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - isAlone (enter)"); // *************************************************************
  let howMuchPlayers = 0;
  for (let i = 0; i < 3; i++) {
    if (this.state.players.playersArr[i].status === "play") {
      howMuchPlayers++;
    }
  }
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - isAlone (exit)"); // *************************************************************
  return (howMuchPlayers === 1) ? true : false;
}

// **********
winGameModalOn = () => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - winGameModalOn (enter)"); // *************************************************************
  this.setState({ isWinModalOpen: true });
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - winGameModalOn (exit)"); // *************************************************************
}

// **********
winGameModalOff = (callback) => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - winGameModalOff (enter)"); // *************************************************************
  
  
  if (callback) {
    // callback();
    this.setState( { isWinModalOpen: false, isRedirectToMain: true } );
    this.onClickOnReset(false, false); // сброс
  } else {
    this.setState( { isWinModalOpen: false } );
    this.onClickOnReset(true, false);
  }

  // this.onClickOnReset(true, false, this.checkForFirstStep);
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - winGameModalOff (exit)"); // *************************************************************
}

// **********
inputPLayersName = (event) => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - inputPLayersName (enter)"); // *************************************************************
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
    default: break;
  }
  this.setState( {tempSetState: newTempSetState} );
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - inputPLayersName (exit)"); // *************************************************************
}

// **********
saveSattings = () => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - saveSattings (enter)"); // *************************************************************
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
  newPls.playersArr[2].status = (newPls.numberOfPlayers === 3) ? "play" : "off";

  let newFS = {};
  newFS.maxFieldColumn = this.state.tempSetState.fieldSize.cols;
  newFS.maxFieldRows = this.state.tempSetState.fieldSize.rows;
  let newLS = this.state.tempSetState.linesSize;
  this.setState( {fieldSize: newFS, linesLength: newLS, players: newPls}, () => { this.onClickOnReset(false, false) } );
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - saveSattings (exit)"); // *************************************************************
}

// **********
notSaveSattings = () => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - notSaveSattings (enter)"); // *************************************************************
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
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - notSaveSattings (exit)"); // *************************************************************
}

// **********
changeSettings = (paramName, paramValue, paramExtend) => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - changeSettings (enter)"); // *************************************************************

  switch (paramName) {
    case "playersCount":
      if (this.state.tempSetState.numOfPl !== paramValue) {
        let newTempState = {...this.state.tempSetState};
        newTempState.numOfPl = paramValue;
        this.setState( {tempSetState: newTempState} );
      }
      break;
    case "fieldSize":
      if (this.state.tempSetState.fieldSize.cols !== paramValue) {
        let newTempState = {...this.state.tempSetState};
        newTempState.fieldSize.cols = paramValue;
        newTempState.fieldSize.rows = paramExtend;
        this.setState( {tempSetState: newTempState} );
      }
      break;
    case "lineSize":
      if (this.state.tempSetState.linesSize !== paramValue) {
        let newTempState = {...this.state.tempSetState};
        newTempState.linesSize = paramValue;
        this.setState( {tempSetState: newTempState} );
      }
      break;
      case "whoPLay":
        switch(paramValue) {
          case 1:
            if(paramExtend !== this.state.tempSetState.playerOneType) {
              let newTempState = {...this.state.tempSetState};
              newTempState.playerOneType = paramExtend;
              this.setState( {tempSetState: newTempState} );
            }
            break;
          case 2:
            if(paramExtend !== this.state.tempSetState.playerTwoType) {
              let newTempState = {...this.state.tempSetState};
              newTempState.playerTwoType = paramExtend;
              this.setState( {tempSetState: newTempState} );
            }
            break;
          case 3:
            if(paramExtend !== this.state.tempSetState.playerThirdType) {
              let newTempState = {...this.state.tempSetState};
              newTempState.playerThirdType = paramExtend;
              this.setState( {tempSetState: newTempState} );
            }
            break;
            default: break;
        }
      break;
    default: break;
  }
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - changeSettings (exit)"); // *************************************************************
}

// **********
makeHumanAnimation = (column) => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - makeHumanAnimation (enter)"); // *************************************************************

  // console.log(this.stackLevelPrint(this.stackLevel) + "Пробуем делать ход: игрок - " + this.state.players.currentPlayer); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (!this.state.isGaming) {
    // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - makeHumanAnimation (exit)"); // *************************************************************
    return;
  }
  // console.log(this.stackLevelPrint(this.stackLevel) + "Делаем"); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // console.log(this.stackLevelPrint(this.stackLevel) + "Ищем ячейку"); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  let index = this.state.field[column].lastIndexOf(0);
  // alert(index);
  if (index === -1) {
    // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - makeHumanAnimation (exit)"); // *************************************************************
    return;
  }

    let firsDate = Date.now();
    this.animationAIStart(column, this.state.players.currentPlayer, this.makeMove, firsDate);
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - makeHumanAnimation (exit)"); // *************************************************************    
}

// **********
makeMove = (columnNuber) => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - makeMove (enter)"); // *************************************************************
  // console.log(this.stackLevelPrint(this.stackLevel) + "Пробуем делать ход: игрок - " + this.state.players.currentPlayer); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // if (!this.state.isGaming) {
  //   console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - makeMove (exit)"); // *************************************************************
  //   return;
  // }
  // console.log(this.stackLevelPrint(this.stackLevel) + "Делаем"); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // проверяем - есть ли в колонке свободные ячейки    
  let index = this.state.field[columnNuber].lastIndexOf(0);
  // alert(index);
  // if (index === -1) {
  //   console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - makeMove (exit)"); // *************************************************************
  //   return;
  // }

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
    // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - makeMove (exit)"); // *************************************************************
    return;
  }
  // меняем игрока
  if ( this.isDrawn() ) {
    // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - makeMove (exit)"); // *************************************************************
    return;
  }
  this.changePlayer();

  // здесь второй вариант вызова просчета хода AI
  if (this.state.players.playersArr[this.state.players.currentPlayer-1].type === 2) {
    this.makeAiMove(); }
    // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - makeMove (exit)"); // *************************************************************
}

// **********
changePlayer = () => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - changePlayer (enter)"); // *************************************************************
  // console.log(this.stackLevelPrint(this.stackLevel) + "Меняем игрока"); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  let newPlayer = this.state.players;

  do {
    newPlayer.currentPlayer++;
    if (newPlayer.currentPlayer > newPlayer.numberOfPlayers) {
      newPlayer.currentPlayer = 1; }
  } while ( newPlayer.playersArr[newPlayer.currentPlayer-1].status !== "play" );

  this.setState( {players : newPlayer} // в этом месте в первом варианте был вызов просчета хода AI
  );
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - changePlayer (exit)"); // *************************************************************
}

// **********
makeAiMove = () => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - makeAiMove (enter)"); // *************************************************************
// console.log (this.stackLevelPrint(this.stackLevel) + "Будет ходить AI"); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111

if (!this.state.isGaming) {
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - makeAiMove (exit)"); // *************************************************************
  return;
}


  let columnsNumber = this.state.fieldSize.maxFieldColumn; 
// console.log (this.stackLevelPrint(this.stackLevel) + "Считаем ходы для " + columnsNumber + " колонок"); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111
  let possibleMove = [];

  for (let j = 0; j < 3; j++) { // будем кидать в эту колонку фишку от имени каждого игрока
    possibleMove.push([]);
    
    for (let i = 0; i < columnsNumber; i++) {  // идем по очереди по клонкам поля
      // console.log (this.stackLevelPrint(this.stackLevel) + "Смотрим " + i + " колонку"); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111
    
        let index = this.state.field[i].lastIndexOf(0); // ищем индекс фишки в этой колонке
        if (index === -1 || (this.state.players.playersArr[j].status !== "play") ) { // если не куда положить новую фишку, 
        // console.log (this.stackLevelPrint(this.stackLevel) + "Не нашли вободных ячеек"); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111
          possibleMove[j][i] = 0;
          continue; // идем к следующей колонке
        }
        // console.log (this.stackLevelPrint(this.stackLevel) + "Нашли " + index + " ячейку"); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111
    
        let line = [];
              // console.log (this.stackLevelPrint(this.stackLevel) + "Кидаем в " + i + " клонку, " + index + " ячейку фишку " + j + " игрока"); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      
        line.push ( this.checkLineInDirectionSecond (i, index, j+1, 1, 0).length );
        line.push ( this.checkLineInDirectionSecond (i, index, j+1, 1, 1).length );
        line.push ( this.checkLineInDirectionSecond (i, index, j+1, 0, 1).length );
        line.push ( this.checkLineInDirectionSecond (i, index, j+1, -1, 1).length );
              // console.log (this.stackLevelPrint(this.stackLevel) + "В нашли линии: " + line); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      
        
        possibleMove[j][i] = Math.max.apply(null, line);
        // console.log (this.stackLevelPrint(this.stackLevel) + "Максимальная из них: " + possibleMove[j][i] ); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      
    }

  }

  // console.log(this.stackLevelPrint(this.stackLevel) + "-------------------------------------------------"); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      
  // console.log(this.stackLevelPrint(this.stackLevel) + "В итоге получились такие возможные шаги: "); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      
  // console.log(this.stackLevelPrint(this.stackLevel) + "-----> Первый игрок: " + possibleMove[0]); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      
  // console.log(this.stackLevelPrint(this.stackLevel) + "-----> Второй игрок: " + possibleMove[1]); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      
  // console.log(this.stackLevelPrint(this.stackLevel) + "-----> Третий игрок: " + possibleMove[2]); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      

let myVariants;
let firstEnemyVariants;
let secondEnemyVariants;

switch(this.state.players.currentPlayer) {
  case 1:
    myVariants = [...possibleMove[0]];
    firstEnemyVariants = [...possibleMove[1]];
    secondEnemyVariants = [...possibleMove[2]];
    break;
  case 2:
    myVariants = [...possibleMove[1]];
    firstEnemyVariants = [...possibleMove[2]];
    secondEnemyVariants = [...possibleMove[0]];
    break;
  case 3:
    myVariants = [...possibleMove[2]];
    firstEnemyVariants = [...possibleMove[0]];
    secondEnemyVariants = [...possibleMove[1]];
    break;
  default: break;
}

// console.log(this.stackLevelPrint(this.stackLevel) + "Мои ходы: " + myVariants); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      
// console.log(this.stackLevelPrint(this.stackLevel) + "1 - Враг: " + firstEnemyVariants); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      
// console.log(this.stackLevelPrint(this.stackLevel) + "2 - Враг: " + secondEnemyVariants); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      

let resultVariant = [];
for (let k = 0; k < columnsNumber; k ++) {
  resultVariant.push( Math.max(firstEnemyVariants[k], secondEnemyVariants[k]) * 2 + myVariants[k] );
  if ( myVariants[k] >= this.state.linesLength ) resultVariant[k] *= 100; // если я могу составить свою выигрышную линию, увеличиваем вес этого хода
  // if ( firstEnemyVariants[k] === secondEnemyVariants[k] )
}
// console.log(this.stackLevelPrint(this.stackLevel) + "Результат: " + resultVariant); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      

let maxOfResult = Math.max.apply(null, resultVariant);
// console.log(this.stackLevelPrint(this.stackLevel) + "Лучший: " + maxOfResult); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      

for (let t = 0; t < columnsNumber; t++) {
  // console.log(this.stackLevelPrint(this.stackLevel) + "item: "+resultVariant[t]+"; maxOfResult: "+maxOfResult+"; firstEnemyVariants: "+firstEnemyVariants[t]+"; secondEnemyVariants: "+secondEnemyVariants[t]);
  if ( (resultVariant[t] === maxOfResult) && (firstEnemyVariants[t] > secondEnemyVariants[t]) ) {
    resultVariant[t] += 0.5; }
}

// console.log(this.stackLevelPrint(this.stackLevel) + "После анализа на несколько лучших: " + resultVariant); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      



maxOfResult = Math.max.apply(null, resultVariant);
let howMuchMaxElements = resultVariant.map( (x, i) => x===maxOfResult ? i : -1 ).filter( x => x !== -1 );
let randomOfMaxColumns = Math.floor(Math.random() * (howMuchMaxElements.length - 0 + 0)) + 0;


// console.log(this.stackLevelPrint(this.stackLevel) + "Сколько колонок с максимальным значением: " + howMuchMaxElements); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      
// console.log(this.stackLevelPrint(this.stackLevel) + "Случайный выбор колонки: " + randomOfMaxColumns); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      
// console.log(this.stackLevelPrint(this.stackLevel) + "AI будет ьбросать фишку в колонку: " + howMuchMaxElements[randomOfMaxColumns]); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111      



// console.log(this.stackLevelPrint(this.stackLevel) + "Запускаем анимацию для AI"); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let firsDate = Date.now();

// this.timerId = setInterval(this.animationAIStep, 20, howMuchMaxElements[randomOfMaxColumns],
//   this.state.players.currentPlayer, this.makeMove, firsDate);

this.animationAIStart( howMuchMaxElements[randomOfMaxColumns], this.state.players.currentPlayer, this.makeMove, firsDate );
  
  // console.log(this.stackLevelPrint(this.stackLevel) + "Конец AIstep -> возвращаемся в makeMove -> и дальше вверх по call stack (isGame: "+this.state.isGaming+")");
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - makeAiMove (exit)"); // *************************************************************
}

animationAIStart = (column, player, funcAfterAnimation, firsDate) => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - animationAIStart (enter)"); // *************************************************************

  this.animationAIStep(column, player, funcAfterAnimation, firsDate);
  this.timerId = setInterval(this.animationAIStep, this.state.gameSpeed, column, player, funcAfterAnimation, firsDate);
  

  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - animationAIStart (exit)"); // *************************************************************
}

animationAIStep = (column, player, funcAfterAnimation, firsDate) => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - animationAIStep (enter)"); // *************************************************************
// console.log(this.stackLevelPrint(this.stackLevel) + "Время между окончанием AIstep и началом animation: "+ (Date.now()-firsDate) ) ;
// console.log(this.stackLevelPrint(this.stackLevel) + "Вошли в анимацию: игрок - " + player + 
  // "; Анимация уже: " + this.isTimerWorking +
  // "; isGame: " + this.state.isGaming);

  this.isTimerWorking = true;
  let newField = [...this.state.field];
  let indexBlank = newField[column].lastIndexOf(0);
  let indexFill = newField[column].indexOf(99);
  
  if (indexFill > indexBlank) {
    newField[column][indexFill] = 0;
    clearInterval(this.timerId);
    this.isTimerWorking = false;
    this.setState( {field: newField, isGaming: true} );
  } else {
  newField[column][indexFill+1] = 99;
  newField[column][indexFill] = 0;
  this.setState( {field: newField, isGaming: false} );
  }
  // this.setState( {field: newField} );
  
  if ( !this.isTimerWorking ) {   // Здесь был вызов хода AI (только для AI) // && this.state.players.playersArr[player-1].type === 2
    funcAfterAnimation(column);
  }
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - animationAIStep (exit)"); // *************************************************************
}

// **********
// onClickOnReset = (isWin, isDrawn, callback) => {
  onClickOnReset = (isWin, isDrawn) => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - onClickOnReset (enter)"); // *************************************************************
  // во всех трех ("player.Сбросить счет", "Сохранить настройки", "Победа") вызовах
  let newPlayer = {...this.state.players};
  
  newPlayer.playersArr[newPlayer.currentPlayer-1].wins++;
  
  newPlayer.playersArr[0].status = "play";
  newPlayer.playersArr[1].status = "play";
  newPlayer.playersArr[2].status = (newPlayer.numberOfPlayers === 3) ? "play" : "off";
  
  let newIsGaming = true;
  let newField1 = this.createNewField();
    
  // всегда (но если не победа позже сбрасываем), получается, что инкремент только когда победа
  let newGlobalRound = this.state.globalRound + 1;

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
      reloadGame: true,
      isFirstStepModalOpen: true
    }
  // , () => { if(callback) callback(); }
  );

  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - onClickOnReset (exit)"); // *************************************************************

}

// **********
createNewField = () => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - createNewField (enter)"); // *************************************************************
  const newField = [];

  for (let i = 0; i < this.state.fieldSize.maxFieldColumn; i++) {
    newField.push([]);
    for (let j = 0; j < this.state.fieldSize.maxFieldRows; j++) {
      newField[i].push(0);
    }
  }
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - createNewField (exit)"); // *************************************************************
  return newField;
}

// **********
isWinSecond = (beginColumn, beginIndex, currentPlayer) => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - isWinSecond (enter)"); // *************************************************************
  let line = this.checkLineInDirectionSecond (beginColumn, beginIndex, currentPlayer, 1, 0);
  if (line.length >= this.state.linesLength) {
    // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - isWinSecond (exit)"); // *************************************************************
    return line;
  }
  
  line = this.checkLineInDirectionSecond (beginColumn, beginIndex, currentPlayer, 1, 1);
  if (line.length >= this.state.linesLength) {
    // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - isWinSecond (exit)"); // *************************************************************
    return line;
  }
  
  line = this.checkLineInDirectionSecond (beginColumn, beginIndex, currentPlayer, 0, 1);
  if (line.length >= this.state.linesLength) {
    // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - isWinSecond (exit)"); // *************************************************************
    return line;
  }
  
  line = this.checkLineInDirectionSecond (beginColumn, beginIndex, currentPlayer, -1, 1);
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - isWinSecond (exit)"); // *************************************************************
  return line;
}

// **********
checkLineInDirectionSecond = (beginColumn, beginIndex, currentPlayer, dC, dI) => {
  // console.log(this.stackLevelPrint(++this.stackLevel) + "CallStack: " + this.stackLevel + " - checkLineInDirectionSecond (enter)"); // *************************************************************
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
  // console.log(this.stackLevelPrint(this.stackLevel--) + "CallStack: " + (this.stackLevel+1) + " - checkLineInDirectionSecond (exit)"); // *************************************************************
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
                makeMove={this.makeHumanAnimation}
                // makeMove={this.makeMove}
                resetGame={this.onClickOnReset}
                saveSattings={this.saveSattings}
                notSaveSattings={this.notSaveSattings}
                changeSettings={this.changeSettings}
                inputPLayersName={this.inputPLayersName}
                loseGame={this.loseGame}
                winGameModalOff={this.winGameModalOff}
                drawnGameModalOff={this.drawnGameModalOff}
                makeAiMove={this.makeAiMove}
                checkForFirstStep={this.checkForFirstStep}
                firstStepModalOff={this.firstStepModalOff}
              />
            }
          />

          <Route
            path="/"
            render = {props =>
              <FooterLayout
                {...props}
                isGaming={this.state.isGaming}
              />
            }
          />

        </div>
      </BrowserRouter>
    );
  }
}

export default GlobalLayout;