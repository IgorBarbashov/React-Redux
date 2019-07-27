import React from "react";

import "./item-status-filter.css";

const ItemStatusFilter = ({ onChangeFilterStatus, filterStatus }) => {
  const { all, important, done } = filterStatus;

  return (
    <div className="item-status-filter btn-group">
      <button
        onClick={filterStatus.all ? null : onChangeFilterStatus("all")}
        type="button"
        className={`btn ${all ? "btn-info" : "btn-outline-secondary"}`}
      >
        All
      </button>
      <button
        onClick={onChangeFilterStatus("important")}
        type="button"
        className={`btn ${important ? "btn-info" : "btn-outline-secondary"}`}
      >
        Important
      </button>
      <button
        onClick={onChangeFilterStatus("done")}
        type="button"
        className={`btn ${done ? "btn-info" : "btn-outline-secondary"}`}
      >
        Done
      </button>
    </div>
  );
};

export default ItemStatusFilter;
