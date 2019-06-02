import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateNewTaskText, addTask, removeTask } from '../actions';

// BEGIN (write your solution here)
class App extends Component {

  taskRemoveHandler = (event, index) => {
    event.preventDefault();
    this.props.dispatch(removeTask(index));
  };

  taskAddHandler = (event) => {
    event.preventDefault();
    this.props.dispatch(addTask(this.props.text));
  };

  changeTextHandler = (event)=> {
    this.props.dispatch(updateNewTaskText(event.target.value));
  };

  renderTasks = (tasks) => {
    return (
      <div className="mt-3">
        <ul className="list-group">
          {tasks.map((task, index) => 
            <li className="list-group-item d-flex">
              <span className="mr-auto">{task}</span>
              <button type="button" className="close" onClick={this.task  RemoveHandler(index)}>
                <span>&times;</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  };

  render() {
    const { text, tasks } = this.props;

    return(
      <div className="col-5">
        <form onSubmit={this.taskAddHandler} action="" className="form-inline">
          <div className="form-group mx-sm-3">
            <input onChange={this.changeTextHandler} type="text" required value={text} />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Add</button>
        </form>
        {tasks && tasks.length ? this.renderTasks(tasks) : null}
    </div>
    );
  };
};

const mapSateToProps = (state) => ({
  text: state.text,
  tasks: state.tasks 
});

export default connect(mapSateToProps)(App);
// END
