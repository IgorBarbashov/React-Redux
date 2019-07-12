import React, { Component } from 'react';
import Hello from './components/Hello';
import Panel from './components/Panel';
import Context from './context';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lng: 0,
      hello: [
        'Hello',
        'Привет',
        'Ola',
        'Shalom',
        'Bonjour'
      ],
      currentHello: 'Hello'
    }
  }

  changeLanguage = () => {
    let newLng = this.state.lng + 1;
    if (newLng >= this.state.hello.length) {
      newLng = 0;
    }

    this.setState({
      lng: newLng,
      currentHello: this.state.hello[newLng]
    });

  }

  showAlert() {
    alert('Hello!');
  }

  render() {
    return (
      <div className="App">
        <Context.Provider value={{
          ...this.state,
          onClick: this.changeLanguage}} >
          <Panel onClickElement={this.showAlert}/>
            

          <Hello name="Andrey"/>
        </Context.Provider>

      </div>
    );
  }
}

export default App;
