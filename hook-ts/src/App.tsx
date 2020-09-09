import React, { useReducer } from "react";

const App: React.FC = () => {
  // interfaces & types
  enum ActionType {
    IncrementA,
    IncrementB,
    Calculate
  }
  interface IActionIncrementA {
    step: number;
    type: ActionType.IncrementA;
  }
  interface IActionIncrementB {
    step: number;
    type: ActionType.IncrementB;
  }
  interface IActionCalculate {
    type: ActionType.Calculate;
  }
  type Action = IActionIncrementA | IActionIncrementB | IActionCalculate;
  const initialState = { a: 0, b: 0, result: 0 };
  type State = Readonly<typeof initialState>;
  // interfaces & types

  //reducer
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case ActionType.Calculate:
        return { ...state, result: state.a * state.b };
      case ActionType.IncrementA: {
        const a = state.a + action.step;
        return reducer({ ...state, a }, { type: ActionType.Calculate });
      }
      case ActionType.IncrementB: {
        const b = state.b + action.step;
        return reducer({ ...state, b }, { type: ActionType.Calculate });
      }
      default:
        return state;
    }
  }
  //reducer

  // using (5:17)
  const incA = step => ({ type: ActionType.IncrementA, step });
  const incB = step => ({ type: ActionType.IncrementB, step });
  // using

  return <div>123</div>;
};

export default App;
