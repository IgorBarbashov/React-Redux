import React, { Component } from "react";
import GlobalLayout from "./components/fourInLine/globalLayout/globalLayout";
import "./App.css";

class App extends Component {
  render() {
    // alert("App");

    return (
        <GlobalLayout startGame={true}/>
    );
  }
}

export default App;