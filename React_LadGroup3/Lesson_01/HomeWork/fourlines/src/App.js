import React, { Component } from "react";
import "./App.css";
import Table from "./components/table";
import StatusBar from "./components/statusbar";
import MessageBox from "./components/messagebox";

class App extends Component {
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
    
        players: {
          currentPlayer: 1,
          playersArr: [ {id: 1, name: "Петя"}, {id:2, name: "Вася"} ]
        },

        messageText: "игра в самом разгаре...",

        isGaming: true,
        isWarning: false
      }
  }

  onClickOnField = (columnNuber) => {
    if (!this.state.isGaming) return;

    // проверяем - есть ли в колонке свободные ячейки    
    let index = this.state.field[columnNuber].lastIndexOf(0);
    if (index === -1) {
        if (this.state.messageText === "игра в самом разгаре...") {
          let newMessageText = "В данной колонке нет сводобных ячеек";
          let newIsWarning = true;
          this.setState( {messageText: newMessageText, isWarning: newIsWarning} );
        }
      return;
    }

    // если надо - обновляем строку-сообщение и стиль сообщения
    if (this.state.messageText !== "игра в самом разгаре...") {
      let newMessageText = "игра в самом разгаре...";
      let newIsWarning = false;
      this.setState( {messageText: newMessageText, isWarning: newIsWarning} );
    }

    // обновляем состояние поля (кладем фишку)
    let currentPlayer = this.state.players.currentPlayer;
    let newField = [...this.state.field];
    newField[columnNuber][index] = currentPlayer;
    this.setState( {field : newField} );
    
    // ищем линию из 4-х или более фишек
    let winLine = this.isWinSecond(columnNuber, index, currentPlayer);

    if (winLine.length >= 4) { // если нашли победную линию

      for (let i = 0; i < winLine.length; i ++) { // выделим ее красным цветом
        newField[winLine[i].column][winLine[i].index] += 10;
      }
      let newMessageText = "Выиграл " + this.state.players.playersArr[currentPlayer-1].name; // и обновить сообщение
      let newIsGamin = false; // и остановить игру
      this.setState( {field: newField, messageText: newMessageText, isGaming: newIsGamin} );
      
      return;
    }
    // меняем игрока
    this.changePlayer();
  }
  
  changePlayer = () => {
    let newPlayer = this.state.players;
    newPlayer.currentPlayer = (newPlayer.currentPlayer === 1) ? 2 : 1;
    this.setState( {players : newPlayer} );
  }

  onClickOnReset = () => {
    if (this.state.isGaming) {
      let isReset = window.confirm("Вы уверены, что хотите начать игру сначала?");
      if (!isReset) return;
    }

    let newPlayer = this.state.players;
    newPlayer.currentPlayer = 1;
    let newIsGaming = true;
    let newMessageText = "игра в самом разгаре...";
    let newIsWarning = false;
    let newField = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ];
    this.setState( {players: newPlayer, field: newField, isGaming: newIsGaming, messageText: newMessageText, isWarning: newIsWarning} );
  }

  onClickOnStatusBar = () => {
    this.onClickOnReset();
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
    return (
      <div className="app">

        <StatusBar 
          players={this.state.players}
          onClick={this.onClickOnStatusBar}
          isGaming={this.state.isGaming}
        />
        
        <MessageBox
          messageText={this.state.messageText}
          isGaming={this.state.isGaming}
          isWarning={this.state.isWarning}
        />

        <Table
          field={this.state.field}
          onClick={this.onClickOnField}
        />

      </div>
    );
  }
}

export default App;