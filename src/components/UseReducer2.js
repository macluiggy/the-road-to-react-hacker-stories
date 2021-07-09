import React, { useReducer } from 'react';

const UseReducer2 = () => {
	return (
		<div>
			<Counter />
		</div>
		)
}

//const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
      	count: state.count + 1, 
      	negative: state.count + 1 < 0,
      	isPar: (state.count) % 2
      };
    case 'decrement':
      return {
      	count: state.count - 1, 
      	negative: state.count - 1 < 0,
      	isPar: (state.count) % 2
      };
  	case 'reset' :
  		return {...state, count: 0, isPar: true}
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, {count: 0, negative: false, isPar: true});
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'reset'})}>reset</button>
      {state.negative 
      	? <p>the number is negative</p> 
      	: state.count === 0 
      	? <p>the number is zero</p> 
      	: <p>the number is positive</p>}
      	{state.isPar
      		? <p>and is pair</p>
      		: <p>and is impair</p>}
    </>
  );
}
export default UseReducer2