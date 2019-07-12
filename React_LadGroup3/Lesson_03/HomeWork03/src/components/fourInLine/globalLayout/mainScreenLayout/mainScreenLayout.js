import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import PlayingGameLayout from "./playingGameLayout/playingGameLayout";
import SettingsLayout from "./settingsLayout/settingsLayout";
import StartGameLayout from "./startGameLayout/startGameLayout";
import ErrorMessageLayout from "./errorMessageLayout/errorMessageLayout";

import "./style.css"

class MainScreenLayout extends Component {
    render() {
        return (
            <div className="main-screen-layout">

                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props =>
                            <StartGameLayout
                                {...props}
                                myState={this.props.myState}
                            />
                        }
                    />

                    <Route
                        path="/game"
                        render={props =>
                            <PlayingGameLayout
                                {...props}
                                myState={this.props.myState}
                                makeMove={this.props.makeMove}
                                resetGame={this.props.resetGame}
                                loseGame={this.props.loseGame}
                                winGameModalOff={this.props.winGameModalOff}
                                drawnGameModalOff={this.props.drawnGameModalOff}
                            />
                        }
                    />

                    <Route
                        path="/settings"
                        render={props =>
                            <SettingsLayout
                                {...props}
                                myState={this.props.myState}
                                changeSettings={this.props.changeSettings}
                                saveSattings={this.props.saveSattings}
                                notSaveSattings={this.props.notSaveSattings}
                                inputPLayersName={this.props.inputPLayersName}
                            />
                        }
                    />

                    <Route component={ErrorMessageLayout} />
                </Switch>
                
            </div>
        );
    }
}

export default MainScreenLayout;