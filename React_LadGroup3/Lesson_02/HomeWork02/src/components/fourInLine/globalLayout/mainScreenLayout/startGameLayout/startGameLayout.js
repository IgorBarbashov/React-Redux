import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import "./style.css"

class StartGameLayout extends Component {
    render() {
    // alert("StartGameLayout");
    // const curPath = this.props.location.pathname ? this.props.location.pathname : "/";
    const curIsLink = (!this.props.location.state || !this.props.location.state.isLink) ? false : true;
    if (!curIsLink) { return <Redirect to="/error" />; }
    
        return (
            <div className="sg-layout">
            {/* <div className="comp-name-and-data">StartGameLayout (/ - {curPath}):</div> */}
            {/* <div className="comp-name-and-data">Мы попали сюда по ссылке Link?: {""+curIsLink} (isLink)</div> */}

                
                <div>
                    <Link to={{ pathname: "/game", state: {isLink: true} }}>
                        Начать игру (это проверяемый Link)
                    </Link>
                </div>
                <div>
                    <Link to={{ pathname: "/settings", state: {isLink: true} }}>
                        Задать начальные настройки (это проверяемый Link)
                    </Link>
                </div>


                
            </div>
        );
    }
}

export default StartGameLayout;