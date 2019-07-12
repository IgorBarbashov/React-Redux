import React, { Component } from "react";
import PropTypes from "prop-types";
import "./world.css"

class World extends Component {
    state = {
        isMouseRightDown: false,
        isMouseLeftDown: false
    }

    mouseEnter = (i, j) => {
        if (this.state.isMouseRightDown) this.props.setBeginState(50, i ,j);
        if (this.state.isMouseLeftDown) this.props.setBeginState(1, i ,j);
    }
    
    mouseDown = (e, i, j) => {
        e.preventDefault();
        if (this.state.isMouseRightDown || this.state.isMouseLeftDown) return;
        if (e.button === 0) this.setState( {isMouseLeftDown: true}, ()=>this.mouseEnter(i, j) );
        if (e.button === 2) this.setState( {isMouseRightDown: true}, ()=>this.mouseEnter(i, j) );
    }

    mouseUp = (e) => {
        e.preventDefault();
        if (e.button === 0) this.setState( {isMouseLeftDown: false} );
        if (e.button === 2) this.setState( {isMouseRightDown: false} );
    }
    
    renderColumn = (column, i) => {
        return (
            <div className="column" key={i}>
                { column.map( (item, j) => this.renderCell(item, j, i) ) }
            </div>
        );
    }

    renderCell = (cell, j, i) => {
        return (
            <div
                key = {j}
                className = {cell ? (cell<50 ? "cell life-first" : "cell life-second") : "cell"}
                onMouseDown = { (e) => this.mouseDown(e, i, j) }
                onMouseUp = {this.mouseUp}
                onContextMenu = { (e) => e.preventDefault() }
                onMouseEnter = {() => this.mouseEnter(i, j) }
            >
                    {/* {cell} */}
            </div>
        );
    }

    render() {
        return (
            <div className="world">
                {this.props.world.map(this.renderColumn)}
            </div>
        );
    }
}

World.propTypes = {
    world: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    setBeginState: PropTypes.func.isRequired,
}

export default World;