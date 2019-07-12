import React, { Component } from 'react';
import Table from '../table';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Game extends Component {
  state = {
    fields: [
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 1, 0, 0, 2],
      [0, 0, 1, 0, 1, 1],
      [0, 0, 1, 1, 1, 1],
      [0, 2, 2, 2, 2, 1],
      [0, 2, 2, 2, 2, 1]
    ]

  }

  onClickColumn = (colNum) => {
    const newField = [...this.state.fields];
    newField[colNum] = [1, 1, 1, 1, 1, 1];
    this.setState({fields: newField});
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
        
    
        <Table 
            onClickFromTable={this.onClickColumn}
            field={this.state.fields}
        />

    </>
  );
  }
}

export default Game;
