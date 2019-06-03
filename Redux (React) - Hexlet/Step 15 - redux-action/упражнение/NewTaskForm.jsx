import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
  };
  return props;
};

const actionCreators = {
  updateNewTaskText: actions.updateNewTaskText,
  addTask: actions.addTask,
};

class NewTaskForm extends React.Component {
  // BEGIN (write your solution here)
  handleAddTask = (event) => {
    event.preventDefault();
    const id = _.uniqueId();
    this.props.addTask({ id, text: this.props.text });
  };

  handleUpdateNewTaskText = (event) => {
    event.preventDefault();
    this.props.updateNewTaskText(event.target.value)
  };
  // END

  render() {
    const { text } = this.props;

    return (
      <form action="" className="form-inline" onSubmit={this.handleAddTask}>
        <div className="form-group mx-sm-3">
          <input
            type="text"
            required
            value={text}
            onChange={this.handleUpdateNewTaskText}
          />
        </div>
        <input type="submit" className="btn btn-primary btn-sm" value="Add" />
      </form>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(NewTaskForm);
