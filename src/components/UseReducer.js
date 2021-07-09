import React, { useReducer, useEffect } from 'react';

const reducer = (state, action) => {
	/*return action.type === 'increase' 
	? state + 1 
	: action.type === 'decrease'
	? state - 1
	: 0*/
	switch (action.type) {
    case 'INCREASE':
      return { ...state, n: state.n + 1 };
    case 'DECREASE':
      return { ...state, n: state.n - 1 };
    default:
      return state;
  }
}

const  UseReducer = () => {
	const [count, dispatchCount] = useReducer(reducer, {comment: 'hola', n: 10});
	useEffect(() => {
		console.log('rendered')
	}, [count])
	return (
		<div>
		<button onClick={() => dispatchCount({type: 'increase'})}>
			increase
		</button>
		<button onClick={() => dispatchCount({type: 'decrease'})} >
			decrease
		</button>
		<button onClick={() => dispatchCount({type: 'reset'})} >reset</button> <br />
			{count.n}
		</div>
		)
}

export default UseReducer