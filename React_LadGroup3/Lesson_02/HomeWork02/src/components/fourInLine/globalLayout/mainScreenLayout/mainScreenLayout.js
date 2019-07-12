import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import PlayingGameLayout from "./playingGameLayout/playingGameLayout";
import SettingsLayout from "./settingsLayout/settingsLayout";
import StartGameLayout from "./startGameLayout/startGameLayout";
import ErrorMessageLayout from "./errorMessageLayout/errorMessageLayout";

import "./style.css"

class MainScreenLayout extends Component {
    render() {
    // alert("MainScreenLayout");
    // const curPath = this.props.location.pathname ? this.props.location.pathname : "/";
    // const curIsLink = (!this.props.location.state || !this.props.location.state.isLink) ? false : true;
    // if (!curIsLink) { return <Redirect to="/error" />; }
    
        return (
            <div className="main-screen-layout">
            {/* <div className="comp-name-and-data">MainScreenLayout (всегда - {curPath}):</div> */}
            {/* <div className="comp-name-and-data">Мы попали сюда по ссылке Link?: {""+curIsLink} (isLink)</div> */}
                
            <Switch>
                <Route exact path="/" component={StartGameLayout} />

                <Route
                    path="/game"
                    render={props =>
                        <PlayingGameLayout
                            {...props}
                            myState={this.props.myState}
                            makeMove={this.props.makeMove}
                            resetGame={this.props.resetGame}
                        />
                    }
                />

                <Route path="/settings" component={SettingsLayout} />

                <Route component={ErrorMessageLayout} />
            </Switch>


            </div>
        );
    }
}

export default MainScreenLayout;