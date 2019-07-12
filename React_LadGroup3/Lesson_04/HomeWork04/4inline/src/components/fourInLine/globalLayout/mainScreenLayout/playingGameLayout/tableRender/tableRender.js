import React, { Component } from "react";
import PropTypes from 'prop-types';
import ColumnRender from "../columnRender/columnRender";
import MyModal from "../../../gameModal/gameModal";
import "./tableRender.css";

class TableRender extends Component {
    // state = {
    //     isFirstStepModalOpen: true
    // }

    // firstStepModalOff = () => {
    //     this.setState( { isFirstStepModalOpen: false }, () => this.props.checkForFirstStep() );
    // }

    renderColumn = (column, i) => {
        return (
            <ColumnRender
                key={i}
                column={column}
                onClick = { () => this.props.makeMove(i)}
                fieldSize = {this.props.fieldSize}
                currentPlayer={this.props.currentPlayer}
                // currentPlayerType={this.props.currentPlayerType}
                // makeAiMove={this.props.makeAiMove}
            />
        );
    }

    render () {
        // alert("TableRender");
        // if (this.props.currentPlayerType === 2) {
        //     alert("Ход AI");
        //     this.props.makeAiMove();
        // }

        return (
        <>
            <MyModal
                isModalOpen={this.props.isFirstStepModalOpen}
                modalFunctionOff={this.props.firstStepModalOff}
                title={"Раунд "+ this.props.globalRound}
                // content={<>Начинаем раудн N.</>}
            />

            <div className="table"> 
                { this.props.field.map(this.renderColumn) }
            </div>
        </>
        );
    }
}

TableRender.propTypes = {
    field: PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.number ) ),
    fieldSize: PropTypes.objectOf( PropTypes.number ),
    makeMove: PropTypes.func,
    currentPlayer: PropTypes.number,
    isFirstStepModalOpen: PropTypes.bool,
    firstStepModalOff: PropTypes.func,
    globalRound: PropTypes.number
}

export default TableRender;