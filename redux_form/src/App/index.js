import React, {Component, Fragment} from 'react';
import LoginForm from '../components/LoginForm';
import {SubmissionError} from 'redux-form';

class App extends Component {
  
  submit = input=>{
    if(['Настя', 'Леша', 'Миша', 'Света'].includes (input.username)){
      throw new SubmissionError ({
        username : "Имя пользователя уже существует",
      });
    }else{
      window.alert (JSON.stringify(input))
    }
};

  getInitialValues () {
    return {
      username: 'Юрчик',
      password: '',
    };
  }
  
  render () {
    return (
      <Fragment>
        <h1>Redux Form</h1>
        <LoginForm onSubmit={this.submit} initialValues={this.getInitialValues()}/>
      </Fragment>
    );
  }
}

export default App;