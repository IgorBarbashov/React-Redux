import React, { Component } from "react";
import RoomPreview from "./roompreview";
import "./style.css";

class ChooseRooms extends Component {
    renderRooms = (el, i) => {
        return (
            <RoomPreview key={i} room={el}
                deleteRoomByID={this.props.deleteRoomByID}
                showRoomOrRooms={this.props.showRoomOrRooms}
            />
        );
    }

    render() {
        return (
            <div className="chooserooms">
                Список комнат:
                { (this.props.allRooms.length === 0) ?
                    <div><b>Пока не создано ни одной комнаты</b></div>:
                    <div>{this.props.allRooms.map(this.renderRooms)}</div>
                }
                
                <button
                    onClick={this.props.createNewRoom}
                    name="addroom"
                    value="addroom">
                    Создать новую комнату
                </button>
            </div>
        );
    }
}

export default ChooseRooms;