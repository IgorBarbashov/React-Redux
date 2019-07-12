import React, { Component} from "react";
import { Redirect, Link } from "react-router-dom";
import "./style.css"

class GameButton extends Component {
    render() {
        return (
             
            <Link to={ { pathname: this.props.buttonPath, state: {isLink: true} } } >
                <div className="green-button" onClick={this.props.buttonFunc}>
                    {this.props.buttonName}
                </div>
            </Link>

        );
    }
}

export default GameButton;