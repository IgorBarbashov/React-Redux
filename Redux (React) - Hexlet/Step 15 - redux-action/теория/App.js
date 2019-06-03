import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

function App({ action11, action12, action21, action22 }) {

  return (
    <div>
      <div><button onClick={()=>action11('1qqqq')}>STATE1_TYPE_1</button></div>
      <div><button onClick={()=>action12('2qqqq')}>STATE1_TYPE_2</button></div>
      <div><button onClick={()=>action21('3aaaa')}>STATE2_TYPE_1</button></div>
      <div><button onClick={()=>action22('4ssss')}>STATE2_TYPE_2</button></div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  test1: state.test1,
  test2: state.test2
});

export default connect(mapStateToProps, {...actions})(App);