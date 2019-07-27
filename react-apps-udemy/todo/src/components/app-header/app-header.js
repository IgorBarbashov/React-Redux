import React from "react";

import "./app-header.css";

const AppHeader = ({ todos }) => {
  const done = todos.filter(item => item.isDone).length;
  const toDo = todos.length - done;

  return (
    <div className="app-header d-flex">
      <h1>Todo List</h1>
      <h2>
        {toDo} more to do, {done} done
      </h2>
    </div>
  );
};

export default AppHeader;
