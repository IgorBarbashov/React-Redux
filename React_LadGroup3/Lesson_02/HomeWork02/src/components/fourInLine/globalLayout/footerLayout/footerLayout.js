import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import SettingsSign from "./SettingsSign/SettingsSign";
import LogoGitHub from "./LogoGitHub/LogoGitHub";
import LogoVK from "./LogoVK/LogoVK";
import LogoFB from "./LogoFB/LogoFB";
import "./style.css"

class FooterLayout extends Component {
    
    state = {
        colors: {
            "SettingsSign": "white",
            "LogoGitHub": "#9696a1",
            "LogoVK": "#9696a1",
            "LogoFB": "#9696a1",
            "SettingsSign-In": "red",
            "LogoGitHub-In": "white",
            "LogoVK-In": "white",
            "LogoFB-In": "white",
            "SettingsSign-Out": "white",
            "LogoGitHub-Out": "#9696a1",
            "LogoVK-Out": "#9696a1",
            "LogoFB-Out": "#9696a1",
            "SettingsSignSize": 50,
            "SettingsSignSize-In": 50,
            "SettingsSignSize-Out": 50,
        }
    }

    mouseEnternOnItem = (itemName) => {
        const newColors = Object.assign({}, this.state.colors);
        newColors[itemName] = this.state.colors[itemName + "-In"];

        if (itemName === "SettingsSign") {
            newColors[itemName + "Size"] = this.state.colors[itemName + "Size-In"];
        }

        this.setState( { colors: newColors } );
    }

    mouseLeaveFromItem = (itemName) => {
        const newColors = Object.assign({}, this.state.colors);
        newColors[itemName] = this.state.colors[itemName + "-Out"];

        if (itemName === "SettingsSign") {
            newColors[itemName + "Size"] = this.state.colors[itemName + "Size-Out"];
        }

        this.setState( { colors: newColors } );
    }

    render() {
        // alert("FooterLayout");
        // const curPath = this.props.location.pathname ? this.props.location.pathname : "/";
        const curIsLink = (!this.props.location.state || !this.props.location.state.isLink) ? false : true;
        if (!curIsLink) { return <Redirect to="/error" />; }

        return (
            <div className="footer-layout">
            {/* <div className="comp-name-and-data">FooterLayout (всегда - {curPath}):</div> */}
            {/* <div className="comp-name-and-data">Мы попали сюда по ссылке Link?: {""+curIsLink} (isLink)</div> */}
            
                <div className="left-column-footer">
                    <Link to={{ pathname: "/settings", state: {isLink: true} }}>                
                        <SettingsSign
                            // fromPathName={this.props.location.pathname}
                            size={this.state.colors["SettingsSignSize"]}
                            color={this.state.colors["SettingsSign"]}
                            mouseEnternOnItem={this.mouseEnternOnItem}
                            mouseLeaveFromItem={this.mouseLeaveFromItem}
                        />
                    </Link>
                </div>
        <div className="rigth-column-footer">
                <div>
                    <a href="https://github.com/IgorBarbashov/React_LadGroup3" target="_blank">
                        <LogoGitHub
                            size="30"
                            color={this.state.colors["LogoGitHub"]}
                            mouseEnternOnItem={this.mouseEnternOnItem}
                            mouseLeaveFromItem={this.mouseLeaveFromItem}
                        />
                    </a>
                </div>

                <div>
                    <a href="https://vk.com/igor_barbashov" target="_blank">
                        <LogoVK
                            size="30"
                            color={this.state.colors["LogoVK"]}
                            mouseEnternOnItem={this.mouseEnternOnItem}
                            mouseLeaveFromItem={this.mouseLeaveFromItem}
                        />
                    </a>
                </div>
                
                <div>
                    <a href="https://www.facebook.com/Barbashov.Igor" target="_blank">
                        <LogoFB
                            size="30"
                            color={this.state.colors["LogoFB"]}
                            mouseEnternOnItem={this.mouseEnternOnItem}
                            mouseLeaveFromItem={this.mouseLeaveFromItem}
                        />
                    </a>
                </div>
        </div>
            </div>
        );
    }
}

export default FooterLayout;