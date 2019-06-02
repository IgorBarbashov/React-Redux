import React from 'react';

// BEGIN (write your solution here)
const App = ({ dispatch, text = '', ...actionCreators }) => {
  const { changeTextAction, resetTextAction } = actionCreators;

  // console.log(changeTextAction);
  // console.log(resetTextAction);

  return <div>
      <form>
        <input onChange={(e)=>dispatch(changeTextAction(e.target.value))} type="text" value={text} />
        <button onClick={()=>dispatch(resetTextAction())} type="button">Reset</button>
      </form>
      {text ? <div>{text}</div> : null }
    </div>
};

export default App;
// END
