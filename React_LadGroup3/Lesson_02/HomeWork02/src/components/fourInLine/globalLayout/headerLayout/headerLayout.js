import React, { Component } from 'react';
import { Route } from "react-router-dom";
import StartGameHeader from "./startGameHeader/startGameHeader";
import PlayingHeader from "./playingHeader/playingHeader";
import "./style.css"

class HeaderLayout extends Component {
    render() {
    // alert("HeaderLayout");
    // const curPath = this.props.location.pathname ? this.props.location.pathname : "/";
    // const curIsLink = (!this.props.location.state || !this.props.location.state.isLink) ? false : true;
    // if (!curIsLink) { return <Redirect to="/error" />; }
    
        return (
            <div className="header-layout">
            {/* <div className="comp-name-and-data">HeaderLayout (всегда - {curPath}):</div> */}
            {/* <div className="comp-name-and-data">Мы попали сюда по ссылке Link?: {""+curIsLink} (isLink)</div> */}
            
            
            <Route exact path="/" component={StartGameHeader} />
            
            <Route
                path="/game"
                render={props =>
                    <PlayingHeader
                        {...props}
                        gameState = {this.props.gameState}
                    />
                }
            />

            <Route
                path="/settings"
                render={props =>
                    <PlayingHeader
                        {...props}
                        gameState = {this.props.gameState}
                    />
                }
            />
            
            {/* <Route path="/settings" component={PlayingHeader} /> */}
            
            </div>
        );
    }
}

export default HeaderLayout;