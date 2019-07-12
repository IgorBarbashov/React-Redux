import React, { Component } from "react";
import "./style.css";

class RoomPreview extends Component {
    getRoomStatus = (statusID) => {
        let statusString;
        switch(statusID) {
            case 0:
                statusString = "Ждем администратора";
                break;
            case 1:
                statusString = "Ждем игроков";
                break;
            case 2:
                statusString = "Идет игра";
                break;
            case 3:
                statusString = "Закрыта";
                break;
            default: break;
        }
        return statusString;
    }


    render() {
        let statusID = this.props.room.roomState.roomStatus;
        let roomInitPLayers = this.props.room.roomInitPLayers;

        return (
            <div className="roompreview">
                <div className="roompreview params">
                    {/* <div><b>Параметры:</b><br/> {this.props.room.roomState}</div> */}
                    <div><b>Параметры:</b><br/> {this.getRoomStatus(statusID)}<br/>
                    Кол-во присоединившихся игроков: {roomInitPLayers}
                    </div>
                </div>

                <div className="roompreview control">
                    <div>Комната: <b>{this.props.room.idroom}</b></div>
                    
                    { (statusID == 0 || statusID == 1)  ?
                    <div>
                        <button name="enterrrom" value="enterrrom"
                            onClick={ () => this.props.showRoomOrRooms(this.props.room.idroom) }>
                            Войти в комнату
                        </button>
                    </div> : ""
                    }
                    
                    { statusID !== 2 ?
                        <div>
                            <button name="delrrom" value="delrrom"
                                onClick={ () => this.props.deleteRoomByID(this.props.room.idroom) }>
                                Удалить комнату
                            </button>
                        </div> : ""
                    }
                </div>
                
            </div>
        );
    }
}

export default RoomPreview;