import React, { Component } from 'react';
import World from "./components/world/world";

class App extends Component {
  constructor() {
    super();

    this.state = {
      worldType: 0,
      worldBeginSize: 20, 
      world: [],

      isGaming: false,
      maxWorldSize: 75
    }
  }

  componentDidMount() {
    this.createBlankWorld();  
  }

  createBlankWorld = () => {
    if (this.state.isGaming) return;
    let newWorld = [];

    for (let i = 0; i < this.state.worldBeginSize; i++) {
      newWorld.push([]);
      for (let j = 0; j < this.state.worldBeginSize; j++) {
        newWorld[i].push(0);
      }
    }

    this.setState( {world: newWorld} );
  }

  copyCurrentWorld = () => {
    let newWorld = [];

    for (let i = 0; i < this.state.world.length; i++) {
      newWorld.push([]);
      for (let j = 0; j < this.state.world.length; j++) {
        newWorld[i].push(this.state.world[i][j]);
      }
    }

    return newWorld;
  }

  reduceWorld = (currentWorld, cutting) => {
    if (currentWorld.length - cutting < this.state.worldBeginSize) { return currentWorld; }

    let freeBorderSize = [0, 0, 0, 0];

    for (let i=0; i<cutting; i++) {
      for (let j=0; j<currentWorld.length;j++) {
        if(currentWorld[j][i] !== 0) freeBorderSize[0] = -1;
      }
    }

    for (let i=currentWorld.length-1; i>currentWorld.length-cutting-1; i--) {
      for (let j=0; j<currentWorld.length;j++) {
        if(currentWorld[i][j] !== 0) freeBorderSize[1] = -1;
      }
    }
    
    for (let i=currentWorld.length-1; i>currentWorld.length-cutting-1; i--) {
      for (let j=0; j<currentWorld.length;j++) {
        if(currentWorld[j][i] !== 0) freeBorderSize[2] = -1;
      }
    }

    for (let i=0; i<cutting; i++) {
      for (let j=0; j<currentWorld.length;j++) {
        if(currentWorld[i][j] !== 0) freeBorderSize[3] = -1;
      }
    }

    freeBorderSize.push(freeBorderSize[0]);
    for (let i=0; i<4; i++) {
      if ( freeBorderSize[i]===0 && freeBorderSize[i+1]===0 ) {
        currentWorld = this.cutWorld(currentWorld, cutting, i);
        currentWorld = this.cutWorld(currentWorld, cutting, (i+1>3 ? 0 : i+1) );
        break;
      }
    }

    return currentWorld;
  }

  cutWorld = (currentWorld, cutting, i) => {
    let newCuttedWorld = [];
    switch(i) {
      case 0:
        for(let j=0; j < currentWorld.length; j++) {
          newCuttedWorld.push([]);
          for (let k=cutting; k < currentWorld[0].length; k++) {
            newCuttedWorld[j].push(currentWorld[j][k]);
          }
        }
        break;
      case 1:
        for (let j=0; j < currentWorld.length-cutting; j++) {
          newCuttedWorld.push([]);
          for (let k=0; k < currentWorld[0].length; k++) {
            newCuttedWorld[j].push(currentWorld[j][k]);
          }
        }
        break;
      case 2:
        for(let j=0; j < currentWorld.length; j++) {
          newCuttedWorld.push([]);
          for (let k=0; k < currentWorld[0].length-cutting; k++) {
            newCuttedWorld[j].push(currentWorld[j][k]);
          }
        }
        break;
      case 3:
        for (let j=cutting; j < currentWorld.length; j++) {
          newCuttedWorld.push([]);
          for (let k=0; k < currentWorld[0].length; k++) {
            newCuttedWorld[j-cutting].push(currentWorld[j][k]);
          }
        }
        break;
      default: break;
    }
  
    return newCuttedWorld;
  }

  extendWorld = (currentWorld, adding) => {
    let newWorld = [];
    let size = currentWorld.length;
    let newSize = size + 2*adding;

    for (let i=0; i<newSize; i++) {
      newWorld.push([]);
      for (let j=0; j<newSize; j++) {
        newWorld[i].push(0);
      }
    }

    for (let i=0; i<size; i++) {
      for (let j=0; j<size; j++) {
        newWorld[i + adding][j + adding] = currentWorld[i][j];
      }
    }

    return newWorld;
  }

  isLifeOnBorder = (currentWorld) => {
    let max = currentWorld.length-1;
    let lifeOnBorder = false;

    for (let i=0; i<=max; i++) { if (currentWorld[0][i] !== 0) { lifeOnBorder=true; } }
    for (let i=0; i<=max; i++) { if (currentWorld[max][i] !== 0) { lifeOnBorder=true; } }
    for (let i=1; i<=max-1; i++) { if (currentWorld[i][0] !== 0) { lifeOnBorder=true; } }
    for (let i=1; i<=max-1; i++) { if (currentWorld[i][max] !== 0) { lifeOnBorder=true; } }

    return lifeOnBorder;
  }

  setBeginState = (player, i, j) => {
    let newWorld = this.copyCurrentWorld();
    newWorld[i][j] = player;
    this.setState( {world: newWorld} );
  }

  startLifeAuto = () => {
    if (this.state.isGaming) return;
    this.myTimeInterval = setInterval(this.startLife, 100);
  }
  
  stopLifeAuto = () => {
    if (!this.state.isGaming) return;
    clearInterval(this.myTimeInterval);
    this.setState( {isGaming: false} );
  }
  
  startLife = () => {
    let currentWorld = this.copyCurrentWorld();
    let nextWorld = this.copyCurrentWorld();

    currentWorld = this.reduceWorld(currentWorld, 5);
    if (currentWorld.length !== nextWorld.length) {
      nextWorld = this.reduceWorld(nextWorld, 5);
    }

    if ( this.state.worldType===2 && this.isLifeOnBorder(currentWorld) &&
        currentWorld.length < this.state.maxWorldSize ) {
      currentWorld = this.extendWorld(currentWorld, 1);
      nextWorld = this.extendWorld(nextWorld, 1);
    }
    
    this.calculateNextStep(currentWorld, nextWorld);
    this.setState( {world: nextWorld, isGaming: true} );
  }

  calculateNextStep = (currentWorld, nextWorld) => {
    for (let i = 0; i < currentWorld.length; i++) {
      for (let j = 0; j < currentWorld.length; j++) {
        let neighboursCounter = this.lookAround(currentWorld, i, j);
        let hwoParent = ( neighboursCounter % 50 > Math.floor(neighboursCounter / 50) ) ? 1 : 50;
        neighboursCounter = (neighboursCounter % 50) + Math.floor(neighboursCounter / 50);

        if (neighboursCounter > 3 || neighboursCounter < 2) {
          nextWorld[i][j] = 0;
        } else if (neighboursCounter === 3) {
          nextWorld[i][j] = hwoParent;
        } else nextWorld[i][j] = currentWorld[i][j];

      }
    }
  }
  
  lookAround = (currentWorld, i, j) => {
    const neighbours = this.getNeighboursCoordinates(currentWorld, i, j);
      
    let neighboursCounter = neighbours.reduce( (neighboursCount, neighbour) => {
      neighboursCount = neighboursCount + currentWorld[neighbour[0]][neighbour[1]];
      return neighboursCount;
    }, 0);

    return neighboursCounter;
  }

  getNeighboursCoordinates = (currentWorld, i, j) => {
    let neighbours = [
      [i-1, j-1], [i-1, j], [i-1, j+1], [i, j-1],
      [i, j+1], [i+1, j-1], [i+1, j], [i+1, j+1]
    ];

    if ( (this.state.worldType === 1 || this.state.worldType === 2) &&
          currentWorld.length < this.state.maxWorldSize)  {
      neighbours = neighbours.filter(
        neighbour => {
          return (neighbour[0] >= 0 && neighbour[0] < currentWorld.length &&
              neighbour[1] >= 0 && neighbour[1] < currentWorld.length);
        }
      );
    } else if (this.state.worldType === 0 || currentWorld.length >= this.state.maxWorldSize) {
      neighbours = neighbours.map(
        neighbour => {
          return neighbour.map(
            coordinate => {
              if (coordinate < 0) coordinate = currentWorld.length-1;
              if (coordinate >= currentWorld.length) coordinate = 0;
              return coordinate;
            }
          );
        }
      );
    }

    return neighbours;
  }

  render() {
    return (
      <div>
        <div>
          <b>Начальные установки:</b><br/>
          <ul><li>первая колония - левая кнопка мыши (можно зажать)</li>
          <li>вторая колония - правая кнопка мыши (можно зажать)</li></ul>
          Добавлять новых членов колоний и менять тип вселенной можно без остановки игры.<br/><br/>
          Если по границе расширяемой вселенной много свободного места, она сжимается<br/>
          до квадрата меньшего размера. Т.о. поле не так быстро разрастается.<br/>
          Но все же если расширяемая вселенная достигает некоторого установленного размера,<br/>
          она автоматически становиться тороидальной<br/><br/>
        </div>
        
        <div><label>
          <input type="radio" name="universe" value={0} checked={this.state.worldType === 0}
            onChange={(e) => this.setState( {worldType: +e.target.value} ) }
          /><b>Тороидальная вселенная</b> (при выходе за границу переходим на другую сторону)
        </label></div>
        <div><label>
        <input type="radio" name="universe" value={1} checked={this.state.worldType === 1}
            onChange={(e) => this.setState( {worldType: +e.target.value} ) }
          /><b>Ограниченная вселенная</b> (достигли границы - дальше не идем)
        </label></div>
        <div><label>
        <input type="radio" name="universe" value={2} checked={this.state.worldType === 2}
            onChange={(e) => this.setState( {worldType: +e.target.value} ) }
          /><b>Расширяемая вселенная</b> (достигли границы - расширяем вселенную)
        </label></div>

          <div style={ {marginTop: "20px", marginBottom: "10px" } }>
            <input type="button" value="Сбросить поле" onClick={this.createBlankWorld}/>
          </div>
          <div style={ {marginTop: "20px", marginBottom: "50px" } }>
            <input style={ {marginRight: "20px"} } type="button" value="Поехали!" onClick={this.startLifeAuto}/>
            <input type="button" value="Стоп" onClick={this.stopLifeAuto}/>
          </div>

        <World world={this.state.world} setBeginState={this.setBeginState} />
      </div>
    );
  }
}

export default App;