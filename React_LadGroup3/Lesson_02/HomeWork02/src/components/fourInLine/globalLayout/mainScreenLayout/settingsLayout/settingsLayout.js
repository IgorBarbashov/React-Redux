import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import "./style.css"

class SettingsLayout extends Component {
    render() {
    // alert("SettingsLayout");
    // const curPath = this.props.location.pathname ? this.props.location.pathname : "/";
    const curIsLink = (!this.props.location.state || !this.props.location.state.isLink) ? false : true;
    if (!curIsLink) { return <Redirect to="/error" />; }
    
        return (
            <div className="settings-layout">
            {/* <div className="comp-name-and-data">SettingsLayout (/settings - {curPath}):</div> */}
            {/* <div className="comp-name-and-data">Мы попали сюда по ссылке Link?: {""+curIsLink} (isLink)</div> */}




        <div>
          <Link to={{ pathname: "/", state: {isLink: true} }}>
            Начать игру заново (это проверяемый Link)
          </Link>
        </div>
                <div>
          <Link to={{ pathname: "/game", state: {isLink: true} }}>
            Продолжить игру (это проверяемый Link)
          </Link>
        </div>



            </div>
        );
    }
}

export default SettingsLayout;