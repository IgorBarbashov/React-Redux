import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import FooterLayout from "./footerLayout/footerLayout";
import HeaderLayout from "./headerLayout/headerLayout";
import MainScreenLayout from "./mainScreenLayout/mainScreenLayout";
import "./style.css"

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
        numberOfPlayers: 2,
        currentPlayer: 1,
        playersArr: [
            {id: 1, name: "PL1", wins: 10},
            {id: 2, name: "PL2", wins: 20},
            {id: 3, name: "PL3", wins: 30}
        ]
      },

      linesLength: 4,
      globalRound: 1,
      isGaming: true,

      // messageText: "игра в самом разгаре...",
      // isWarning: false
    }
}

makeMove = (columnNuber) => {
  if (!this.state.isGaming) return;

  // проверяем - есть ли в колонке свободные ячейки    
  let index = this.state.field[columnNuber].lastIndexOf(0);
  if (index === -1) {
      // if (this.state.messageText === "игра в самом разгаре...") {
      //   let newMessageText = "В данной колонке нет сводобных ячеек";
      //   let newIsWarning = true;
      //   this.setState( {messageText: newMessageText, isWarning: newIsWarning} );
      // }
    return;
  }

  // если надо - обновляем строку-сообщение и стиль сообщения
  // if (this.state.messageText !== "игра в самом разгаре...") {
  //   let newMessageText = "игра в самом разгаре...";
  //   let newIsWarning = false;
  //   this.setState( {messageText: newMessageText, isWarning: newIsWarning} );
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
    // let newMessageText = "Выиграл " + this.state.players.playersArr[currentPlayer-1].name; // и обновить сообщение
    let newIsGamin = false; // и остановить игру
    this.setState( {field: newField, isGaming: newIsGamin} ); // messageText: newMessageText,
    
    return;
  }
  // меняем игрока
  this.changePlayer();
}

changePlayer = () => {
  let newPlayer = this.state.players;
  newPlayer.currentPlayer++;
  if (newPlayer.currentPlayer > newPlayer.numberOfPlayers) {
      newPlayer.currentPlayer = 1; }
  this.setState( {players : newPlayer} );
}

onClickOnStatusBar = () => {
  this.onClickOnReset();
}

onClickOnReset = () => {
  if (this.state.isGaming) {
    let isReset = window.confirm("Вы уверены, что хотите начать игру сначала?");
    if (!isReset) return;
  }

  let newPlayer = this.state.players;
  newPlayer.currentPlayer = 1;
  newPlayer.playersArr[0].wins = 0;
  newPlayer.playersArr[1].wins = 0;
  newPlayer.playersArr[2].wins = 0;
  let newIsGaming = true;
  let newGlobalRound = 1;
  // let newMessageText = "игра в самом разгаре...";
  // let newIsWarning = false;
  let newField = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];
  
  let newField1 = this.createNewField();

  this.setState ( {field: newField, players: newPlayer, isGaming: newIsGaming, globalRound: newGlobalRound } ); //isWarning: newIsWarning, messageText: newMessageText
}


createNewField = () => {
  const newField = [];
  const lineOfField = [];
  for (let j = 0; j < this.state.fieldSize.maxFieldRows; j++) {
    lineOfField.push(0);
  }
  for (let i = 0; i < this.state.fieldSize.maxFieldColumn; i++) {
    newField.push(lineOfField);
  }
  // this.setState ({ field: newField });
  return newField;
}


// onClickOnStatusBar = () => {
//   this.onClickOnReset();
// }

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
    // const curIsLink = (!this.props.location || !this.props.location.state.isLink) ? false : true;
    // if (!curIsLink) { return <Redirect to="/error" />; }
    // alert("GlobalLayout");
    
    return (
      <BrowserRouter>
        <div className="globalLayout">
        {/* <div className="comp-name-and-data">GlobalLayout (всегда - /):</div> */}
        {/* <div className="comp-name-and-data">Мы попали сюда по ссылке Link?: {""+curIsLink} (isLink)</div> */}
        
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
            render={props =>
              <MainScreenLayout
                {...props}
                myState={this.state}
                makeMove={this.makeMove}
                resetGame={this.onClickOnStatusBar}
              />
            }
          />

          <Route path="/" component={FooterLayout} />

        </div>
      </BrowserRouter>
    );
  }
}

export default GlobalLayout;