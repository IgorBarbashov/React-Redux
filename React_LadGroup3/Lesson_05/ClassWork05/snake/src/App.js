import React, { Component } from 'react';
import Field from "./components/field";

class App extends Component {
  constructor() {
    super();
    this.state = {
      field: [
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0),
        new Array(20).fill(0)        
      ],

      snake: [
      [1, 1],
      [1, 2],
      [1, 3],
      // [1, 4],
      // [1, 5],
      // [1, 6]
      ],

      fruits: [
        [10, 10],
        [15, 15]
       ],
      
      dX: 1,
      dY: 0
    }
  }

  componentDidMount() {
    this.myTimeInterval = setInterval(this.moveSnake, 200);
    this.myFruitInterval = setInterval(this.putNewFruit, 5000);
    document.addEventListener("keyup", this.changeDirection);
  }

  putNewFruit = () => {
    let newFruitX = Math.floor(Math.random() * 19);
    let newFruitY = Math.floor(Math.random() * 19);

    let newFruit = [...this.state.fruits];
    newFruit.push([newFruitX, newFruitY]);

    this.setState( {fruits: newFruit} );
  }

  moveSnake = () => {
    let newStartX = this.state.snake[0][0] + this.state.dX;
    let newStartY = this.state.snake[0][1] + this.state.dY;

    if (newStartX < 0) newStartX = 19;
    if (newStartX > 19) newStartX = 0;
    if (newStartY < 0) newStartY = 19;
    if (newStartY > 19) newStartY = 0;

    for (let i = 1; i < this.state.snake.length; i++) {
      if ( this.state.snake[0][0] === this.state.snake[i][0] &&
           this.state.snake[0][1] === this.state.snake[i][1]
        ) {
          alert("Смерть");
          clearInterval(this.myTimeInterval);
          clearInterval(this.myFruitInterval);
          return;
        }
    }

    let newSnake = [...this.state.snake];
    newSnake.unshift([newStartX, newStartY]);

    let isFruit = false;
    let newFruits = [...this.state.fruits];
    for(let k = 0; k < this.state.fruits.length; k++) {
      if ( this.state.fruits[k][0] === newStartX && this.state.fruits[k][1] === newStartY) {
        isFruit = true;
        newFruits.splice(k, 1);
      }
    }
    if (!isFruit) { newSnake.pop(); }

    this.setState ( {snake: newSnake, fruits: newFruits } );
  }

  changeDirection = (e) => {
    let dX, dY;
    switch (e.keyCode) {
      case 39: //впарво
        dX = 1;
        dY = 0;
      break;
      case 37:  //влево
        dX = -1;
        dY = 0;
      break;
      case 38:  //вверх
        dX = 0;
        dY = -1;
      break;
      case 40:   //вниз
        dX = 0;
        dY = 1;
      break;
      default: break;
    }

    if ( this.state.dX === dX * (-1) || this.state.dY === dY * (-1) ) return;
    this.setState ( {dX, dY} );
  }

  render() {
    return (
      <div>
        <Field field={this.state.field} snake={this.state.snake} fruits={this.state.fruits}/>
        
        {/* <button onClick={ () => this.changeDirection(0, -1) } >Вверх</button>
        <button onClick={ () => this.changeDirection(0, 1) } >Вниз</button>
        <button onClick={ () => this.changeDirection(1, 0) } >Вправо</button>
        <button onClick={ () => this.changeDirection(-1, 0)} >Влево</button> */}

      </div>
    );
  }
}

export default App;
