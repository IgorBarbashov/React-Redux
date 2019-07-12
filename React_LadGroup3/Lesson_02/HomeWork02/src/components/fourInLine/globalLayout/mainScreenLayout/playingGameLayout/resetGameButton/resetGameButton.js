import React, { Component} from "react";
import { Redirect } from "react-router-dom";
import "./style.css"

class ResetGameButton extends Component {
    render() {
        return (
            <div className="green-button" onClick={this.props.resetGame}>
                Сброс игры
                {/* <Redirect to="/" isLink={true} /> */}
            </div>
        );
    }
}

export default ResetGameButton;