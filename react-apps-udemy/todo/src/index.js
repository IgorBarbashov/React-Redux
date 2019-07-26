import React from "react";
import ReactDOM from "react-dom";
import AppHeader from "./components/AppHeader";
import SearchPanel from "./components/SearchPanel";
import TodoList from "./components/TodoList";

const App = () => {
  const items = [
    { label: "Learn React!!!", important: true },
    { label: "Build Awesome App!!!", important: false },
    { label: "Learn ES6!!!", important: true }
  ];
  return (
    <div>
      <AppHeader />
      <SearchPanel />
      <TodoList items={items} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
