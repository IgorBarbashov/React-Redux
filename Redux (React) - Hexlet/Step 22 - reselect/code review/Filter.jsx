import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const filters = [['all', 'All Tasks'], ['active', 'Active Tasks'], ['finished', 'Finished Tasks']];

// BEGIN
const mapStateToProps = (state) => {
  const { tasks: { currentFilterName } } = state;
  return { currentFilterName };
};

const actionCreators = {
  setTasksFilter: actions.setTasksFilter,
};

class Filter extends React.Component {
  handleSetTasksFilter(filterName) {
    const { setTasksFilter } = this.props;
    setTasksFilter({ filterName });
  }

  renderFilter = ([state, name]) => {
    const { currentFilterName } = this.props;
    if (currentFilterName === state) {
      return name;
    }
    return (
      <button
        type="button"
        key={state}
        className="btn btn-link border-0 p-0"
        data-test={`task-filter-${state}`}
        onClick={() => this.handleSetTasksFilter(state)}
      >
        {name}
      </button>
    );
  }

  render() {
    return (
      <div className="mt-3 d-flex justify-content-around">
        {filters.map(this.renderFilter)}
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Filter);
// END
