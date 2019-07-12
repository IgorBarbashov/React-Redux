import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./town.css";

class Town extends Component {

    renderWidget = (widget, i) => {
        return (
        <div className="town">
            <b>{widget.town}</b><br/>
            Температура: {widget.temper}<br/>
            Влажность: {widget.humid}
            <div><input type="button" value="Удалить виджет"
                onClick={ ()=>{ this.props.dellFunc(i) } } /></div>

        </div>
        );
    }
    
    render() {
        return (
            <div>
                {this.props.widgets.map(this.renderWidget)}
            </div>
        );
    }
}

Town.propTypes = {
    // name: PropTypes.string.isRequired,
    // temper: PropTypes.number.isRequired,
    // humid: PropTypes.number.isRequired
    widgets: PropTypes.arrayOf(PropTypes.object),
    dellFunc: PropTypes.func
}

export default Town;