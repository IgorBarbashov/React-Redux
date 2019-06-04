import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const filters = [['all', 'All Tasks'], ['active', 'Active Tasks'], ['finished', 'Finished Tasks']];

// BEGIN (write your solution here)
const actionCreators = {
  setTasksFilter: actions.setTasksFilter
};

const mapStateToProps = ({ tasks: { currentFilterName } }) => {
  return { currentFilterName };
};

const Filter = ({ currentFilterName, setTasksFilter }) => {
  
  const onClickHundler = (event) => {
    event.preventDefault();
    setTasksFilter({ filterName: event.target.dataset.test.split('-')[2]});
  };

  const filterRender = () => {
    return filters.map(filter => {
      if (filter[0] === currentFilterName) {
        return filter[1];
      }
      return (
      <button
        onClick={onClickHundler}
        type="button"
        className="btn btn-link border-0 p-0"
        data-test={`task-filter-${filter[0]}`}>
          {filter[1]}
      </button>
      );
    });
  };

  return(
    <div className="mt-3 d-flex justify-content-around">
      {filterRender()}
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Filter);
// END