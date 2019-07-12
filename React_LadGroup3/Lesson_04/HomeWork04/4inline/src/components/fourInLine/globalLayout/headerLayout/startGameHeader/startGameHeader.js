import React, { Component } from 'react';
import BigGameLogo from "./bigGameLogo/bigGameLogo";
import "./style.css"

class StartGameHeader extends Component {
    render() {
    // alert("StartGameHeader");
    // const curPath = this.props.location.pathname ? this.props.location.pathname : "/";
    // const curIsLink = (!this.props.location.state || !this.props.location.state.isLink) ? false : true;
    // if (!curIsLink) { return <Redirect to="/error" />; }
    
        return (
            <div className="sg-header-layout">
            {/* <div className="comp-name-and-data">StartGameHeader (/ - {curPath}):</div> */}
            {/* <div className="comp-name-and-data">Мы попали сюда по ссылке Link?: {""+curIsLink} (isLink)</div> */}
            
            <BigGameLogo />

            </div>
        );
    }
}

export default StartGameHeader;