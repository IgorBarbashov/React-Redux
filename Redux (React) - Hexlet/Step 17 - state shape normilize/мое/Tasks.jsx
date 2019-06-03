/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';

const mapStateToProps = ({ tasks: { byId, allIds}, tasksUIState }) => {
  // BEGIN (write your solution here)
  const newById = allIds.map(id => byId[id]);
  return {
    tasksUIState,
    tasks: newById
  };
  // END
};

const actionCreators = {
  inverseTaskTheme: actions.inverseTaskTheme,
};

class Tasks extends React.Component {
  handleTasksUIState = id => () => {
    this.props.inverseTaskTheme(id);
  };

  render(){
    const { tasksUIState, tasks } = this.props;

    if (tasks.length === 0) {
      return null;
    }

    return (
      <div className="mt-3">
       <ul className="list-group">
        {tasks.map( task => (
          <li key={task.id} className={`list-group-item d-flex ${tasksUIState[task.id]}`}>
            <span className="mr-auto">
              <a href="#" onClick={this.handleTasksUIState(task.id)}>{task.text}</a>
            </span>
          </li>
        ))}
      </ul>
      </div>
    );
  };
}

export default connect(mapStateToProps, actionCreators)(Tasks);
