import React, { useReducer, useEffect } from 'react';

const reducer = (state, action) => {
	switch (action.type) {
		case 'SUCCESS':
			return {
				isLoading: false,
				users: action.payload,
			}
		case 'FAILED':
			return {
				...state,
				users: undefined,
			}
		case 'FILTER':
			return {
				users : action.initialUsers.filter(({name, username}) =>
					`${username} ${name}`.toLowerCase().includes(action.inputValue.toLowerCase()))
			}
		default:
			return state
	}
}

const initialState = {
	isLoading: true,
	users: []
}
let initialUsers = []

const UseReducer4 = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	
	const filter = e => {
	dispatch({
		type: 'FILTER',
		inputValue: e.target.value,
		initialUsers: initialUsers,
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
				return json
			})
			.then(initial => {
				initialUsers = initial
			})
			.catch(() => dispatch({
				type: 'FAILED',
			}))
	}, [])
	return (
		<div>
		<label htmlFor="search">Search user:</label>
		<br />
		<input  type="text" onInput={filter} />
		<br />
		{state.isLoading
			? 'Loading'
			: !state.users
			? 'Something went wrong'
			: state.users.map(
					({id, ...items}) => <Users key={id} {...items} />
				)}
		</div>
		)
}

const Users = ({id, username, name}) => {
	return <li> {username} - {name} </li>
}
export default UseReducer4