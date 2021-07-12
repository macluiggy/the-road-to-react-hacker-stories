import React, { useReducer, useEffect } from 'react';

const reducer = (state, action) => {
	switch (action.type) {
		case 'SUCCESS':
			return {
				isLoading: false,
				users: action.payload,
			}
		case 'FAILED':
			return undefined
		case 'FILTER':
			return {
				users : action.initialUsers.filter(user =>
					user.name.toLowerCase().includes(action.inputValue.toLowerCase()))
			}
		default:
			return state
	}
}

const initialState = {
	isLoading: true,
	users: []
}
let initialU = []

const UseReducer4 = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	
	const filter = e => {
	dispatch({
		type: 'FILTER',
		inputValue: e.target.value,
		initialUsers: initialU,
	})
}
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(json => {
				dispatch({
					type: 'SUCCESS',
					payload: json,
				})
			})
			.catch(() => dispatch({
				type: 'FAILED',
			}))
		initialU = state.users.map(user => user)
	}, [])
	return (
		<div>
		<input type="text" onInput={filter} />
		{state.isLoading
			? 'Loading'
			: !state.users
			? 'Something went wrong'
			: state.users.map(
					({id, name, username}) => <li key={id}> {username} - {name} </li>
				)}
		</div>
		)
}

export default UseReducer4