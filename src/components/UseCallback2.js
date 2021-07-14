import React, { useReducer, useEffect, memo, useCallback} from 'react';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_INIT':
			return {
				...state,
				isLoading: true,
			}
		case 'FETCH_SUCCESS':
			return {
				...state,
				isLoading: false,
				data: state.payload,
			}
		case 'FETCH_FAILED':
			return {
				...state,
				isLoading: false,
				error: 'Something went wrong',
			}
		case 'SET_COMMENTS':
			return {
				...state,
				path: state.payload
			}
		case 'SET_POSTS':
			return {
				...state,
				path: state.payload,
			}
	}
}

const initialState = {
	isLoading: false,
	data: undefined,
	error: '',
	path: '',
	msg: 'Click a button'
}
const UseCallback2 = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const {isLoading, data, error, path, msg} = state

	useEffect(() => {
		if (!path) return
		dispatch({type: 'FETCH_INIT'})
		fetch(`https://jsonplaceholder.typicode.com/${path}`)
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
	}, [path])

	const setComments = e => {
		console.log(`setting comments`)
		dispatch({
			type: 'SET_COMMENTS',
			payload: e.target.value
		})
	}

	const setPosts = e => {
		console.log(`setting posts`)
		dispatch({
			type: 'SET_POSTS',
			payload: e.target.value,
		})
	}
	return (
		<div>
			<button onClick={setComments} >comments</button>
			<button onClick={setPosts} >posts</button>
			{isLoading
				? 'Loading'
				: !data
				? error || msg
				: data.map(({id, body}) => <li key={id} >{body}</li>)}
		</div>
		)
}

export default UseCallback2