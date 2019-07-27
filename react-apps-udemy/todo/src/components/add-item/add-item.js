import React, { Component } from "react";

export default class AddItem extends Component {
  state = {
    itemName: ""
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({ itemName: value });
  };

  onAddClick = e => {
    e.preventDefault();
    const { onAddItem } = this.props;
    const { itemName } = this.state;
    onAddItem(itemName);
    this.setState({ itemName: "" });
  };

  render() {
    return (
      <form className="add-item top-panel d-flex" onSubmit={this.onAddClick}>
        <input
          type="text"
          className="form-control search-input-input"
          placeholder="type new element"
          onChange={this.onChange}
          value={this.state.itemName}
        />
        <button type="button" className="btn btn-info">
          Add
        </button>
      </form>
    );
  }
}
