import React from "react";

import "./todo-list-item.css";

const TodoListItem = ({
  id,
  label,
  isDone,
  important,
  onDeleted,
  onChangeItem
}) => {
  const spanClassName =
    "todo-list-item" +
    (isDone ? " done" : "") +
    (important ? " important" : "");

  return (
    <div className={spanClassName}>
      <span
        className="todo-list-item-label"
        onClick={onChangeItem(id, "isDone")}
      >
        {label}
      </span>
      <button
        type="button"
        className="btn btn-outline-success btn-sm float-right"
        onClick={onChangeItem(id, "important")}
      >
        <i className="fa fa-exclamation" />
      </button>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm float-right"
        onClick={onDeleted(id)}
      >
        <i className="fa fa-trash-o" />
      </button>
    </div>
  );
};

export default TodoListItem;
