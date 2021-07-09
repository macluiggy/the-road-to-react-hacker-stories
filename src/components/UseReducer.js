import React, { useReducer, useEffect } from 'react';

const reducer = (state, action) => {
	/*return action.type === 'increase' 
	? state + 1 
	: action.type === 'decrease'
	? state - 1
	: 0*/
	switch(action.type) {
		case 'increase':
			return state + 1;
		case 'decrease':
		  	return state - 1;
	 	default:
	 		return 0
	}
}
const initialState = {
  firstname: 'Liesa',
  lastname: 'Huppertz',
  age: 30,
};
 
const action = {
  type: 'INCREASE_AGE',
  payload: {
  	lastname: 'Wieruch',
  },
};

const personReducer = (person, action) => {
	switch (action.type) {
		case 'INCREASE_AGE':
			return {...person, age: person.age + 1};
		case 'CHANGE_LASTNAME':
			return {...person, lastname: action.payload.lastname};
		default:
			return person;
	}
}
const result = personReducer(initialState, action)
const  UseReducer = () => {
	const [count, dispatchCount] = useReducer(reducer, 0);
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
			{count}
			<p>{result.firstname} {result.lastname} - age: {result.age} </p>

		<Todos />
		</div>
		)
}

 
const initialTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: false,
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: false,
  },
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};

const Todos = () => {
	const [todos, dispatch] = React.useReducer(
    todoReducer,
    initialTodos
  );

	const handleChange = todo => {
		dispatch({
			type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
			id: todo.id
		})
	};
 
	  return (
	    <ul>
	      {todos.map(todo => (
	        <li key={todo.id}>
	          <label>
	            <input
	              type="checkbox"
	              checked={todo.complete}
	              onChange={() => handleChange(todo)}
	            />
	            {todo.task}
	          </label>
	        </li>
	      ))}
	    </ul>
	  );
}

export default UseReducer