import React, { Component } from "react";
import Context from "../../context/content";

class AskAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "", password: ""
        };
        // this.input = React.createRef();
    }

    inputLoginAndPassword = (event) => {
        if ( event.target.id === "1") {
            this.setState( { login: event.target.value } );
        } else {
            this.setState( { password: event.target.value } );
        }
    }

    render() {
        return (
            <Context.Consumer>
            {
                (context) => {
                    return (
                        <div>
                            <div>
                                Логин:
                                <input size="15" id="1" type="text"
                                value={this.state.login}
                                onChange={this.inputLoginAndPassword}
                                />
                            </div>

                            <div>
                                Пароль:
                                <input size="15" id="2" type="password"
                                    value={this.state.password}
                                    onChange={this.inputLoginAndPassword}
                                />
                            </div>

                            <div>
                                <button
                                    onClick={() => context.LogIn(this.state.login, this.state.password) }
                                >Войти!</button>
                            </div>

                            <hr/>
                        </div>
                    );
                }
            }
            </Context.Consumer>
        );
    }
}

export default AskAuth;