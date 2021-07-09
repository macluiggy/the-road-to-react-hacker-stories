import React, { useReducer, useEffect } from 'react';

const UseReducer2 = () => {
	return (
		<div>
			{/*<Counter />*/}
      <FetchData />
		</div>
		)
}

const initialState = {
  isLoading: true,
  error: '',
  post: {}
}

const reducer2 = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        post: action.payload
      }
    case 'FETCH_FAILED':
      return {
        ...state,
        isLoading: false,
        error: '404 error',
        post: undefined,
      }
    default:
      return state;
  }
}
console.log(!!{})
const FetchData = () => {
  const [state, dispatch] = useReducer(reducer2, initialState);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: json,
        })
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_FAILED',
        })
      })
  }, [])
  return (
    <div>
      {state.isLoading 
        ? 'loading'
        : !state.post
        ? '404 something went wrong'
        : (
          <ul>
            {state.post.map(({id, name, username}) => <li key={id}>{username} - {name}</li>)}
          </ul>
          )}
    </div>
    )
}

// FIRST COMPONENT USED
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