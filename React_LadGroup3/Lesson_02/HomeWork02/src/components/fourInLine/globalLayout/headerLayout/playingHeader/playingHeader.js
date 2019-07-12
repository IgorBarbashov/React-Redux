import React, { Component } from 'react';
import StatusBarLayout from "./statusBarLayout/statusBarLayout";
import SmallGameLogo from "./smallGameLogo/smallGameLogo";
import { Redirect } from "react-router-dom";
import "./style.css"

class PlayingHeader extends Component {
    render() {
    // alert("PlayingHeader");
    // const curPath = this.props.location.pathname ? this.props.location.pathname : "/";
    const curIsLink = (!this.props.location.state || !this.props.location.state.isLink) ? false : true;
    if (!curIsLink) { return <Redirect to="/error" />; }
    
        return (
            <div className="pl-header-layout">
            {/* <div className="comp-name-and-data">PlayingHeader (/game - {curPath}):</div> */}
            {/* <div className="comp-name-and-data">Мы попали сюда по ссылке Link?: {""+curIsLink} (isLink)</div> */}

            <SmallGameLogo />
            <StatusBarLayout gameState={this.props.gameState} />
            
            </div>
        );
    }
}

export default PlayingHeader;