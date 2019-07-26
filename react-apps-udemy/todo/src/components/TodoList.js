import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ items }) => {
  const todos = items.map((item, index) => (
    <li key={`${item.label}-${index}`}>
      <TodoListItem {...item} />
    </li>
  ));
  return <ul>{todos}</ul>;
};

export default TodoList;
