import React from "react";

import TodoListItem from "./todo-list-item";

import "./todo-list.css";

const TodoList = ({ todos, onDeleted, onChangeItem }) => {
  const elements = todos.map((item, index) => {
    return (
      <li className="list-group-item" key={`${item.label}-${index}`}>
        <TodoListItem
          onDeleted={onDeleted}
          onChangeItem={onChangeItem}
          {...item}
        />
      </li>
    );
  });
  return <ul className="todo-list list-group">{elements}</ul>;
};

export default TodoList;
