/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';

const mapStateToProps = ({ tasks: { byId } }) => {
  console.log(byId);
  // BEGIN (write your solution here)
  return {};
  // END
};

const actionCreators = {
  inverseTaskTheme: actions.inverseTaskTheme,
};

class Tasks extends React.Component {
  // BEGIN (write your solution here)
  // handleTasksUIState = id = () => {
  //   tasksUIState(id);
  // };

  render(){
    return (
      <li className="list-group-item d-flex bg-light text-dark">
        <span className="mr-auto">
          <a href="#">light</a>
        </span>
      </li>
    );
  };

}

export default connect(mapStateToProps, actionCreators)(Tasks);