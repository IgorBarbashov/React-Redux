// 'refs' use example
import React, { Component } from 'react';
import Dropdown from './components/Dropdown';
import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import { connect } from 'react-redux';
import './App.css';

const menu = [
  {
    link: '/articles',
    label: 'Articles'
  },
  {
    link: '/contacts',
    label: 'Contacts'
  },
  {
    link: '/posts',
    label: 'Posts'
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.testInput = React.createRef();
    this.testButton = React.createRef();
    this.trackInput = React.createRef();
  };

  submit = () => {
    console.log('Submit', this.testInput.current.value, " : ", this.testButton.current);
  };

  addTrack = () => {
    console.log('Add track', this.trackInput.current.value);
    this.props.onAddTrack(this.trackInput.current.value);
    this.trackInput.current.value = '';
  };

  render() {
    // консольный вывод из урока redux
    console.log('testStore', this.props.testStore);
    // консольный вывод из урока redux
    
    return (
      <div className="container">
        <Dropdown />
        <Header items={menu}/>
        <RegistrationForm />
        
        <hr />
        <input type="text" placeholder="test" ref={this.testInput}/>
        <button onClick={this.submit} ref={this.testButton}>Submit</button>

        
        <hr />Redux part
        <div>
          <input type="text" ref={this.trackInput} />
          <button onClick={this.addTrack}>Add track</button>
          <button onClick={() => this.props.onDelTrack('Test_Del_Track')}>Delete track</button>
          <ul>
            {this.props.testStore.map((track, index) =>
              <li key={index}>{track}</li>
            )}
          </ul>
        </div>


      </div>
    );
  };
}

export default connect(
  state => ({
    // testStore: state, // это в первом варианте, когда state в store простой массив
    testStore: state.tracks // это второй вариант, когда store - составной объект
  }),
  dispatch => ({
    onAddTrack: (trackName) => {
      dispatch({type: 'ADD_TRACK', payload: trackName});
    },
    onDelTrack: (trackName) => {
      dispatch({type: 'DELETE_TRACK', payload: trackName});
    }
  })
)(App);