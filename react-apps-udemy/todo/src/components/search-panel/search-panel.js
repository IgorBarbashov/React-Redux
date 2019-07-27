import React from "react";

import "./search-panel.css";

const SearchPanel = ({ filterText, onChangeFilterText }) => {
  return (
    <input
      type="text"
      className="form-control search-input-input"
      placeholder="type to search"
      onChange={onChangeFilterText}
      value={filterText}
    />
  );
};

export default SearchPanel;
