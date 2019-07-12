import React, { Component } from "react";
// import Snake from "./snake";
import "./style.css";

class Field extends Component {
    renderColumn = (column, i) => {
        return (
            <div className="column" key={i}>
                { column.map( (item, j) => this.renderCell(item, j, i) ) }
            </div>
        );
    }

    renderCell = (cell, j, i) => {
        return (
            <div
            className = { this.whatInCell(i, j) === 0 ? "cell" : 
            this.whatInCell(i, j) === 1 ? "cell life-first" :
            this.whatInCell(i, j) === 3 ? "cell life-fruit" :
            "cell life-second"}
            key = {j}>
                {/* {cell} */}
            </div>
        );
    }

    whatInCell = (i, j) => {
        if (this.props.snake[0][0] === i && this.props.snake[0][1] === j) return 2;

        for(let fruit of this.props.fruits) {
            if(fruit[0]===i && fruit[1]===j) {
                return 3;
            }
        }

        for(let bodySnake of this.props.snake) {
            if (bodySnake[0]=== i && bodySnake[1] === j) {
                return 1;
            }
        }

        return 0;
    }
    
    
    render() {
        return(
            <div className="world">
                {this.props.field.map(this.renderColumn)}
                {/* <Snake snake={this.props.snake} field={this.props.field}/> */}
            </div>
        );
    }
}

export default Field;