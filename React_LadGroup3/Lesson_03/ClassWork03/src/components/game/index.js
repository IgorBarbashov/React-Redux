import React, { Component } from 'react';
import Table from '../table';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from "axios";

class Game extends Component {
  state = {
    fields: [],
    loaded: false, // обрабатывается просто при рендере компонента if'ом
    room: [0,1]
  }

  componentDidMount() { // выполняется при первом появлении компонента на экране
    // console.log("Game here");

// ***********
//     axios.get("http://localhost:5000/field")
//     .then( (response) => {
//         // console.log(response.data);
//         // сюда добавить установки флага что загрузили
//         this.setState({fields: response.data, loaded: true})
//         setInterval(this.updateField, 1000);
//     });
//   }
var mySetInterval = 0;

axios.post("http://localhost:5000/field", {playerId: 0})
.then( (response) => {
    // console.log(response.data);
    // сюда добавить установки флага что загрузили
    this.setState({fields: response.data, loaded: true})
    this.mySetInterval = setInterval(this.updateField, 1000);
});
}

componentDidMount() { //функция которая вызывается при закрытии компонениа
    clearInterval(this.mySetInterval);

}

// ************************
//   updateField = () => {
//       axios.get ("http://localhost:5000/field")
//       .then( (response) => {
//           this.setState({
//             loaded: true,
//             fields: response.data
//           })
//       })
//   }
updateField = (room) => {
    axios.post ("http://localhost:5000/field", {playerId: 0})
    .then( (response) => {
        this.setState({
          loaded: true,
          fields: response.data
        })
    })
}

  onClickColumn = (colNum, room) => {

    axios.post("http://localhost:5000/move", {
        column: colNum,
        playerId: 0
    }).then ( (response) => {
        this.setState({fields: response.data});
        // console.log(response.data);

    } );
    
    // const newField = [...this.state.fields];
    // newField[colNum] = [1, 1, 1, 1, 1, 1];
    // this.setState({fields: newField});
  }

 render() {
    if (!this.props.location.state || !this.props.location.state.fromWellcome) {
        // return "Откуда ты, друг?";
        return <Redirect to="/" />;
    }
  return (
    <>
        <div><Link to="/">На главную</Link></div>
        <div><Link to={ 
                {
                    pathname: "/endgame",
                    state: {player: this.props.location.state.fpname}
                }
            }
        >Победил игрок 1 ({this.props.location.state.fpname})</Link></div>

        <div><Link to={ 
                {
                    pathname: "/endgame",
                    state: {player: this.props.location.state.spname}
                }
            }
        >Победил игрок 2 ({this.props.location.state.spname})</Link></div>
        
    

            {/* добавить проверку на loaded */}
        <Table 
            onClickFromTable={this.onClickColumn}
            field={this.state.fields}
            room={0}
        />

        <Table 
            onClickFromTable={this.onClickColumn}
            field={this.state.fields}
            room={1}
        />

    </>
  );
  }
}

export default Game;
