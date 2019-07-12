import React, { Component } from 'react';
import Town from "./component/town";
import axios from "axios";
// import Hello from "./component/hello";

class App extends Component {
  constructor() {
    super();
    this.input = React.createRef();
}

  state = {
    // widgets: []
    // town: "London",
    // temper: 100,
    // humid: 10,
    newTown: "London",
    widgets:[
      // {town: "London", temper: 100, humid: 10}
    ]
  }
  
  componentDidMount() {
    this.addWidget();
  }

  addWidget = () => {

    
    // alert(this.state.newTown);
    let newUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.newTown}&APPID=ae443199d5463317de537f447724272e`;
    console.log(newUrl);

    axios.get(newUrl)
      .then( (response) => {
            
            let newWidget = {};
            newWidget.town = response.data.name;
            newWidget.temper = response.data.main.temp;
            newWidget.humid = response.data.main.humidity;

            let newWidgets = [...this.state.widgets];
            newWidgets.push(newWidget);

            console.log(response);
        
        this.setState( { widgets: newWidgets } );
    });

  }

  dellWidget = (i) => {
    
    let newWidgets = [];
    for (let j = 0; j < i; j++) {
      newWidgets.push(this.state.widgets[j]);
    }
    for (let j = i+1; j < this.state.widgets.length; j++) {
      newWidgets.push(this.state.widgets[j]);
    }
    
    this.setState( { widgets: newWidgets } );

  }

  enterTowmName = (event) => {
    this.setState({
      newTown: event.target.value
    });
}
  
  render() {
    return (
      <div>
        {/* <Hello name={1}/> */}
        
        <div><input type="text" value={this.state.newTown} onChange={this.enterTowmName} /></div>

        
        <div><input type="button" value="Добавить виджет" onClick={this.addWidget} /></div>

        {/* <Town name={this.state.town} temper={this.state.temper} humid={this.state.humid}/> */}
        <Town widgets={this.state.widgets} dellFunc={this.dellWidget}/>
      </div>
    );
  }
}

export default App;