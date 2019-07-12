import React, {Component} from "react";
import "./gameModal.css";

class MyModal extends Component {

  render() {
    if (this.props.isModalOpen === false)
      return null;

    return (
      // <div className="center-modal">
      <div>
        {/* <div className="modal" onClick={e => this.close(e)}> */}
        <div className="modal">
          <h3>{this.props.title}</h3>
          <p>{this.props.content}</p>

          <div className="modal-buttons">
            
          {this.props.firstButton ?
            <div 
              onClick= { e => this.close(e, this.props.firstButton.func) }
              className={"modal-button"}>{this.props.firstButton.name}
            </div> :
            <div className={"modal-button"} onClick={e => this.close(e)} >OK</div>
          }

            { this.props.secondButton ?
              <div
              onClick={ e => this.close(e, this.props.secondButton.func ) }
              className={"modal-button"}>{this.props.secondButton.name}</div> : "" }
          </div>

        </div>
        {/* <div className="bg" onClick={e => this.close(e)}/> */}
        <div className="bg" />
      </div>
    )
  }

  close(e, callback) {
// console.log("close :  - MyModal (enter)"); // *************************************************************  
    e.preventDefault();

    if (this.props.modalFunctionOff) {
      this.props.modalFunctionOff(callback);
    }
  
// console.log("close :  - MyModal (exit)"); // *************************************************************  
  }
}
  
export default MyModal;