import React, { Component } from "react";
import "./style.css";

class Snake extends Component{
    renderSnake = (elem) => {
        
    }

    render() {
        return(
            <div>
                {this.props.snake.map(this.renderSnake)}
            </div>
        );
    }
}

export default Snake;