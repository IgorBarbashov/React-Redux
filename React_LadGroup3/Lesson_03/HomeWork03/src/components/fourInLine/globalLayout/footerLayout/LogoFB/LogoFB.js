import React, { Component } from 'react';
import "./style.css";

class LogoFB extends Component {
    mouseEnternOnItem = () => {
        this.props.mouseEnternOnItem("LogoFB");
    }
    mouseLeaveFromItem = () => {
        this.props.mouseLeaveFromItem("LogoFB");
    }

    render() {
        let fillColor = this.props.color;
        let logoSize = this.props.size + "px";

        return (
        <div
            className="footer-item-logo"
            onMouseEnter={ this.mouseEnternOnItem }
            onMouseLeave={ this.mouseLeaveFromItem }
        >
            <svg
                width={logoSize}
                height={logoSize}
                viewBox="0 0 470.513 470.513"
            >

            <g>
	            <g>
                    <path d="M271.521,154.17v-40.541c0-6.086,0.28-10.8,0.849-14.13c0.567-3.335,1.857-6.615,3.859-9.853   c1.999-3.236,5.236-5.47,9.706-6.708c4.476-1.24,10.424-1.858,17.85-1.858h40.539V0h-64.809c-37.5,0-64.433,8.897-80.803,26.691   c-16.368,17.798-24.551,44.014-24.551,78.658v48.82h-48.542v81.086h48.539v235.256h97.362V235.256h64.805l8.566-81.086H271.521z" fill={fillColor}/>
	            </g>
            </g>

            </svg>
        </div>
        );
    }
}

export default LogoFB;