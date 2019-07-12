import React, {Component} from "react";
import "./gameModal.css";

class MyModal extends Component {
  render() {
    if (this.props.isModalOpen === false)
      return null;

    return (
      <div>
        <div className="modal">
          <h3>{this.props.title}</h3>
          <p>{this.props.content}</p>
        </div>
        <div className="bg" onClick={e => this.close(e)}/>
      </div>
    )
  }

  close(e) {
    e.preventDefault();

    if (this.props.modalFunctionOff) {
      this.props.modalFunctionOff();
    }
  }
}
  
export default MyModal;