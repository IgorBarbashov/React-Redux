import React, { Component } from "react";
import PropsType from "prop-types";
import "./style.css";

class Widget extends Component {
    render() {
        return (
            <div className="widget">
                Town: {this.props.town}<br/>
                Temperature: {this.props.temperature}<br/>
                Humid: {this.props.humid}
            </div>
        );
    }
}

Widget.propTypes = {
    town: PropsType.string.isRequired,
    temperature: PropsType.number.isRequired,
    humid: PropsType.number.isRequired
}

export default Widget;