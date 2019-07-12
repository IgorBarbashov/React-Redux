import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Hello from './components/hello';
import Table from './components/table';
// import Column from './components/column';
// import Cell from './components/cell';

class App extends Component {
      // здесь логика - 'содержание'
      // начинаем писать с view - чтобы потом удобно и наглядно отслеживать логику

  // onNamePress() {
  //   alert(1);
  // }
  state = {
    fields: [
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 1, 0, 0, 2],
      [0, 0, 1, 0, 1, 1],
      [0, 0, 1, 1, 1, 1],
      [0, 2, 2, 2, 2, 1],
      [0, 2, 2, 2, 2, 1]
    ]

  }

  onClickColumn = (colNum) => {
    const newField = [...this.state.fields]; // плоское копирование
    newField[colNum] = [1, 1, 1, 1, 1, 1];
    this.setState({fields: newField});
  }

 render() {
    // return (
    //   <div>
    //     <Hello name="Maxim_html"  onPress={this.onNamePress}/>
    //     <Hello name="Marina_html" />
    //   </div>
    // );
  return <Table 
    onClickFromTable={this.onClickColumn}
    field={this.state.fields}
  />
  
  }
}

export default App;
