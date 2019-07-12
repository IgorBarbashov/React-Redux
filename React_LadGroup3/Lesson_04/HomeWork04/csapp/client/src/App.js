import React, { Component } from "react";
import "./App.css";
import Table from "./components/table";
import StatusBar from "./components/statusbar";
import MessageBox from "./components/messagebox";
// import Widget from "./components/test";
import axios from "axios";
import ChooseRooms from "./components/chooserooms";

class App extends Component {
  constructor() {
    super();
    
    this.SERVER_URL="https://csapp-server.herokuapp.com";

      this.state = {
        // field: [
        //   [0, 0, 0, 0, 0, 0],
        //   [0, 0, 0, 0, 0, 0],
        //   [0, 0, 0, 0, 0, 0],
        //   [0, 0, 0, 0, 0, 0],
        //   [0, 0, 0, 0, 0, 0],
        //   [0, 0, 0, 0, 0, 0],
        //   [0, 0, 0, 0, 0, 0]
        // ],
    
        // players: {
        //   currentPlayer: 1,
        //   playersArr: [ {id: 1, name: "Петя"}, {id:2, name: "Вася"} ]
        // },

        // messageText: "игра в самом разгаре...",

        // isGaming: true,
        // isWarning: false,
        // roomID: -1,

        field: undefined, players: undefined, messageText: undefined,
        isGaming: undefined, isWarning: undefined, roomID: undefined,

        // для теста
        
        isCurrentRoomLoaded: false,
        isCurrentRoomFound: false,
        allRooms: [],
        yourPlayerIDInRoom: undefined
        
        // для теста
      }
  }

  onClickOnField = (columnNuber) => {
    if (this.state.yourPlayerIDInRoom !== this.state.players.currentPlayer) {
      // alert("Чужой ход!");
      return;
    }

    axios
    .post(this.SERVER_URL + "/game/move", {columnNuber, roomID: this.state.roomID})
    .then( (response) => {
      // console.log("только что сделали ход");

      let {field, players, messageText, isGaming, isWarning, roomID} = response.data.rooms.roomState;

      this.setState( {
          isCurrentRoomFound: true,
          isCurrentRoomLoaded: true,

          field, players, messageText,
          isGaming, isWarning, roomID
        });

      })
    // .catch(console.log("ошибка при клике"));
    .catch();
  }
  // onClickOnField = (columnNuber) => {
  //   if (!this.state.isGaming) return;

  //   // проверяем - есть ли в колонке свободные ячейки    
  //   let index = this.state.field[columnNuber].lastIndexOf(0);
  //   if (index === -1) {
  //       if (this.state.messageText === "игра в самом разгаре...") {
  //         let newMessageText = "В данной колонке нет сводобных ячеек";
  //         let newIsWarning = true;
  //         this.setState( {messageText: newMessageText, isWarning: newIsWarning} );
  //       }
  //     return;
  //   }

  //   // если надо - обновляем строку-сообщение и стиль сообщения
  //   if (this.state.messageText !== "игра в самом разгаре...") {
  //     let newMessageText = "игра в самом разгаре...";
  //     let newIsWarning = false;
  //     this.setState( {messageText: newMessageText, isWarning: newIsWarning} );
  //   }

  //   // обновляем состояние поля (кладем фишку)
  //   let currentPlayer = this.state.players.currentPlayer;
  //   let newField = [...this.state.field];
  //   newField[columnNuber][index] = currentPlayer;
  //   this.setState( {field : newField} );
    
  //   // ищем линию из 4-х или более фишек
  //   let winLine = this.isWinSecond(columnNuber, index, currentPlayer);

  //   if (winLine.length >= 4) { // если нашли победную линию

  //     for (let i = 0; i < winLine.length; i ++) { // выделим ее красным цветом
  //       newField[winLine[i].column][winLine[i].index] += 10;
  //     }
  //     let newMessageText = "Выиграл " + this.state.players.playersArr[currentPlayer-1].name; // и обновить сообщение
  //     let newIsGamin = false; // и остановить игру
  //     this.setState( {field: newField, messageText: newMessageText, isGaming: newIsGamin} );
      
  //     return;
  //   }
  //   // меняем игрока
  //   this.changePlayer();
  // }
  
  // changePlayer = () => {
  //   let newPlayer = this.state.players;
  //   newPlayer.currentPlayer = (newPlayer.currentPlayer === 1) ? 2 : 1;
  //   this.setState( {players : newPlayer} );
  // }

  // onClickOnReset = () => {
  //   if (this.state.isGaming) {
  //     let isReset = window.confirm("Вы уверены, что хотите начать игру сначала?");
  //     if (!isReset) return;
  //   }

  //   let newPlayer = this.state.players;
  //   newPlayer.currentPlayer = 1;
  //   let newIsGaming = true;
  //   let newMessageText = "игра в самом разгаре...";
  //   let newIsWarning = false;
  //   let newField = [
  //     [0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0]
  //   ];
  //   this.setState( {players: newPlayer, field: newField, isGaming: newIsGaming, messageText: newMessageText, isWarning: newIsWarning} );
  // }

  onClickOnStatusBar = () => {
    if (this.state.isGaming) {
      let isReset = window.confirm("Вы уверены, что хотите начать игру сначала?");
      if (!isReset) return;
    }

    axios
    .post(this.SERVER_URL + "/game/reset", {roomID: this.state.roomID})
    // .then( console.log("только что сбросили игру") )
    // .catch(console.log("ошибка при клике"));
    .then()
    .catch();
  }
  // onClickOnStatusBar = () => {
  //   this.onClickOnReset();
  // }

  // isWinSecond = (beginColumn, beginIndex, currentPlayer) => {
  //   let line = this.checkLineInDirectionSecond (beginColumn, beginIndex, currentPlayer, 1, 0);
  //   if (line.length >= 4) return line;
    
  //   line = this.checkLineInDirectionSecond (beginColumn, beginIndex, currentPlayer, 1, 1);
  //   if (line.length >= 4) return line;
    
  //   line = this.checkLineInDirectionSecond (beginColumn, beginIndex, currentPlayer, 0, 1);
  //   if (line.length >= 4) return line;
    
  //   line = this.checkLineInDirectionSecond (beginColumn, beginIndex, currentPlayer, -1, 1);
  //   return line;
  // }

  // checkLineInDirectionSecond = (beginColumn, beginIndex, currentPlayer, dC, dI) => {
  //   let maxColumn = this.state.field.length - 1;
  //   let maxIndex = this.state.field[0].length -1;
  //   let isForward = true; // флаг - можем ли мы двигаться по фишкам в заданном в параметрах функции направлении
  //   let isReverse = true; // аналогичный флаг - только показывает можем ли мы двигаться в обратном направлении
  //   const line = [ {column: beginColumn, index: beginIndex} ] // изначально в линии-пбедительнице только одна фишка, с которой и начинаем
  //   let iteratorForward = 1; // итератор движения вперед
  //   let iteratorReverse = -1; // итератор движения назад
  
  //   while (isForward || isReverse) {
  //     if (isForward) { // если можем идти в прямом направлении
  //       let nextColumn = beginColumn + dC * iteratorForward; // следующая колонка
  //       let nextIndex = beginIndex + dI * iteratorForward; // следующий индекс в колонке
  //         if ( nextColumn >= 0 && nextColumn <= maxColumn && nextIndex >= 0 && nextIndex <= maxIndex ) { // если новые индексы на этой итерации не выходят за границы массива
  //           if ( this.state.field[nextColumn][nextIndex] === currentPlayer ) { // если новая фишка того же цвета
  //             line.push( {column: nextColumn, index: nextIndex} ); // добавляем эту фишку в массив линии
  //             iteratorForward++; // увеличиваем итератор
  //           } else isForward = false;
  //         } else isForward = false;
  //     }
  
  //     if (isReverse) { // аналогично, только с отрицательным итератором
  //       let nextColumn = beginColumn + dC * iteratorReverse;
  //       let nextIndex = beginIndex + dI * iteratorReverse;
  //         if ( nextColumn >= 0 && nextColumn <= maxColumn && nextIndex >= 0 && nextIndex <= maxIndex ) {
  //           if ( this.state.field[nextColumn][nextIndex] === currentPlayer ) {
  //             line.push( {column: nextColumn, index: nextIndex} );
  //             iteratorReverse--;
  //           } else isReverse = false;
  //         } else isReverse = false;
  //     }
  //   }
  
  //   return line;
  // }


  /************* тестируем обмен данными с сервером ********************* */

  componentDidMount() {
    this.myTime = setInterval( () => this.showRoomOrRooms(this.state.roomID), 1000 );
    
  //   axios
  //   .post("http://localhost:5000/test", {roomID: 387})
  //   .then( response => console.log(response.data.room) );
  }

  componentWillUnmount() {
    clearInterval(this.myTime);
  }
  
  showRoomOrRooms = (roomID) => {
    // console.log("вызов showRoomOrRooms");
    // console.log("this.state.roomID: " + this.state.roomID);

    axios.post (this.SERVER_URL + "/room", {roomID, yourPlayerIDInRoom: this.state.yourPlayerIDInRoom} )
    .then( (response) => {
      if (response.data.foundRoom) {
        // rooms - моя комната по переданному ID
        let {field, players, messageText, isGaming, isWarning, roomID} = response.data.rooms.roomState;
        let yourPlayerIDInRoom = response.data.yourPlayerIDInRoom;

        // console.log("response.data.rooms.roomState: " + response.data.rooms.roomState);
        // console.log("field: " + field);
        // console.log("players: " + players);
        // console.log("messageText: " + messageText);
        // console.log("isGaming: " + isGaming);
        // console.log("isWarning: " + isWarning);
        // console.log("roomID: " + roomID);

        this.setState( {
          isCurrentRoomFound: true,
          isCurrentRoomLoaded: true,
          yourPlayerIDInRoom: response.data.yourPlayerIDInRoom,

          field, players, messageText,
          isGaming, isWarning, roomID
          
        });
      } else {
        this.setState( {
          isCurrentRoomFound: false,
          isCurrentRoomLoaded: true,
          allRooms: response.data.rooms
        });
      }
    });
  }

  createNewRoom = () => {
    axios
      .get(this.SERVER_URL + "/createnewroom")
      .then(response => this.setState({allRooms: response.data.rooms}))
      // .catch(console.log("error"));
      .catch();
  }

  deleteRoomByID = (roomID) => {
    axios
      .post(this.SERVER_URL + "/delroom", {roomID})
      .then( response => {
          if (response.data.isDelete) {
            this.setState({allRooms: response.data.rooms});
          }
      })
      // .catch(console.log("error"));
      .catch();
  }

  exitFromRoom = () => {
    this.setState( {roomID: -1, isCurrentRoomLoaded: false} );
  }

  /********************************************************************** */
  
  render() {
    return (
      <div className="app">

        { (this.state.isCurrentRoomLoaded && this.state.isCurrentRoomFound) ?
            <>
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
              <div>
                Номер комнаты: <b>{this.state.roomID}</b><br/>
                ID player: <b>{this.state.yourPlayerIDInRoom}</b>
              </div>
              <button onClick={this.exitFromRoom}>Выйти из комнаты (прогресс игры сохранится)</button>
            </>
            :
            <>
            <ChooseRooms
              allRooms={this.state.allRooms}
              createNewRoom={this.createNewRoom}
              deleteRoomByID={this.deleteRoomByID}
              showRoomOrRooms={this.showRoomOrRooms}
            />
            </>
        }

      </div>
    );
  }
}

export default App;







// from class ***************************************************************************

// import React, { Component } from 'react';
// import Table from '../table';
// import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// import axios from "axios";

// class Game extends Component {
//   state = {
//     fields: [],
//     loaded: false, // обрабатывается просто при рендере компонента if'ом
//     room: [0,1]
//   }

//   componentDidMount() { // выполняется при первом появлении компонента на экране
//     // console.log("Game here");

// // ***********
// //     axios.get("http://localhost:5000/field")
// //     .then( (response) => {
// //         // console.log(response.data);
// //         // сюда добавить установки флага что загрузили
// //         this.setState({fields: response.data, loaded: true})
// //         setInterval(this.updateField, 1000);
// //     });
// //   }
// var mySetInterval = 0;

// axios.post("http://localhost:5000/field", {playerId: 0})
// .then( (response) => {
//     // console.log(response.data);
//     // сюда добавить установки флага что загрузили
//     this.setState({fields: response.data, loaded: true})
//     this.mySetInterval = setInterval(this.updateField, 1000);
// });
// }

// componentWillUnmount() { //функция которая вызывается при закрытии компонениа
//     clearInterval(this.mySetInterval);
// }

// // ************************
// //   updateField = () => {
// //       axios.get ("http://localhost:5000/field")
// //       .then( (response) => {
// //           this.setState({
// //             loaded: true,
// //             fields: response.data
// //           })
// //       })
// //   }
// updateField = (room) => {
//     axios.post ("http://localhost:5000/field", {playerId: 0})
//     .then( (response) => {
//         this.setState({
//           loaded: true,
//           fields: response.data
//         })
//     })
// }

//   onClickColumn = (colNum, room) => {

//     axios.post("http://localhost:5000/move", {
//         column: colNum,
//         playerId: 0
//     }).then ( (response) => {
//         this.setState({fields: response.data});
//         // console.log(response.data);

//     } );
    
//     // const newField = [...this.state.fields];
//     // newField[colNum] = [1, 1, 1, 1, 1, 1];
//     // this.setState({fields: newField});
//   }

//  render() {
//     if (!this.props.location.state || !this.props.location.state.fromWellcome) {
//         // return "Откуда ты, друг?";
//         return <Redirect to="/" />;
//     }
//   return (
//     <>
//         <div><Link to="/">На главную</Link></div>
//         <div><Link to={ 
//                 {
//                     pathname: "/endgame",
//                     state: {player: this.props.location.state.fpname}
//                 }
//             }
//         >Победил игрок 1 ({this.props.location.state.fpname})</Link></div>

//         <div><Link to={ 
//                 {
//                     pathname: "/endgame",
//                     state: {player: this.props.location.state.spname}
//                 }
//             }
//         >Победил игрок 2 ({this.props.location.state.spname})</Link></div>
        
    

//             {/* добавить проверку на loaded */}
//         <Table 
//             onClickFromTable={this.onClickColumn}
//             field={this.state.fields}
//             room={0}
//         />

//         <Table 
//             onClickFromTable={this.onClickColumn}
//             field={this.state.fields}
//             room={1}
//         />

//     </>
//   );
//   }
// }

// export default Game;
