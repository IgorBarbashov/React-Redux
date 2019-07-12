import React, { Component } from "react";
import "./Messagebox.css";

class MessageBox extends Component {
    render () {
        let currentClassName = this.props.isGaming ? "messagebox" : "messagebox alerttext";
        currentClassName = this.props.isWarning ? currentClassName + " warningtext" : currentClassName;

        return (
            <div className={currentClassName}>
                <p>{this.props.messageText}</p>
            </div>
        );
    }
}

export default MessageBox;