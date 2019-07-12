import React, { Component } from "react";
import Context from "../../context/content";

class ShowAuth extends Component {
    render() {
        return (
            <Context.Consumer>
            {
                (context) =>
                {
                    return (
                    <div>
                        <b>{context.authuser.role.name}:</b><br/>
                        {context.authuser.username} /<br/>{context.authuser.email}
                        <button onClick={context.LogOut}>Выйти</button>
                        <hr/>
                    </div>
                    );
                }
            }
            </Context.Consumer>
        );
    }
}

export default ShowAuth;