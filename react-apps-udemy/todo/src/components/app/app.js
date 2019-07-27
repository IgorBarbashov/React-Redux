import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddItem from "../add-item";

import "./app.css";

export default class App extends Component {
  itemsId = 10;

  state = {
    todoData: [
      this.createTodoItem("Learn React!!!"),
      this.createTodoItem("Build Awesome App!!!"),
      this.createTodoItem("Learn ES6!!!")
    ],
    filterText: "",
    filterStatus: {
      all: true,
      important: false,
      done: false
    }
  };

  createTodoItem(label) {
    return { label, important: false, isDone: false, id: this.itemsId++ };
  }

  onDeleted = id => () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter(item => item.id !== id);
      return { todoData: newTodoData };
    });
  };

  onAddItem = label => {
    this.setState(({ todoData }) => {
      const newElement = this.createTodoItem(label);
      return { todoData: [...todoData, newElement] };
    });
  };

  onChangeItem = (id, prop) => () => {
    this.setState(({ todoData }) => {
      const doneIndex = todoData.findIndex(item => item.id === id);
      const doneElement = {
        ...todoData[doneIndex],
        [prop]: !todoData[doneIndex][prop]
      };

      return {
        todoData: [
          ...todoData.slice(0, doneIndex),
          doneElement,
          ...todoData.slice(doneIndex + 1)
        ]
      };
    });
  };

  onChangeFilterText = e => {
    const { value } = e.target;
    this.setState({ filterText: value });
  };

  onChangeFilterStatus = prop => e => {
    this.setState(({ filterStatus }) => {
      const newFilterStatus = { ...filterStatus };
      newFilterStatus[prop] = !newFilterStatus[prop];
      if (prop === "all") {
        newFilterStatus.done = false;
        newFilterStatus.important = false;
      }
      newFilterStatus.all = !newFilterStatus.done && !newFilterStatus.important;
      return { filterStatus: newFilterStatus };
    });
  };

  render() {
    const { todoData, filterText, filterStatus } = this.state;
    const filteredTodoData = todoData.filter(
      item =>
        item.label.includes(filterText) &&
        (filterStatus.all ||
          ((!filterStatus.important ||
            item.important === filterStatus.important) &&
            (!filterStatus.done || item.isDone === filterStatus.done)))
    );

    return (
      <div className="todo-app">
        <AppHeader todos={filteredTodoData} />
        <div className="top-panel d-flex">
          <SearchPanel
            filter={this.state.filterText}
            onChangeFilterText={this.onChangeFilterText}
          />
          <ItemStatusFilter
            onChangeFilterStatus={this.onChangeFilterStatus}
            filterStatus={this.state.filterStatus}
          />
        </div>
        <TodoList
          onDeleted={this.onDeleted}
          todos={filteredTodoData}
          onChangeItem={this.onChangeItem}
        />
        <AddItem onAddItem={this.onAddItem} />
      </div>
    );
  }
}
