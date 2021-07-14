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
				data: action.payload,
				msg: false,
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
				path: 'comments',
				cc: !state.cc,
			}
		case 'SET_POSTS':
			return {
				...state,
				path: 'posts',
				cp: !state.cp,
			}
		default:
			return state;
	}
}

const initialState = {
	isLoading: false,
	data: [],
	error: '',
	path: '',
	msg: 'Click a button'
}
const UseCallback2 = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const {isLoading, data, error, path, msg, cc, cp} = state

	useEffect(() => {
		if (!path) return
		//console.log(`useEffect rendered`)
		let url = `https://jsonplaceholder.typicode.com/${path}`
		fetch(url)
			.then(response => {
				dispatch({
					type: 'FETCH_INIT',
				})
				return response.json()
			})
			.then(json => {
				//console.log(url)
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

	const setComments = useCallback(() => {
		console.log(`setComments rendered`)
		dispatch({
			type: 'SET_COMMENTS',
		})
	}, [cc])

	const setPosts = useCallback(() => {
		console.log(`setPosts rendered`)
		dispatch({
			type: 'SET_POSTS',
		})
	}, [cp])

	//console.log(`${path}`)
	//console.log(data)
	return (
		<div>
			<Button setPath={setComments} >comments</Button>
			<Button setPath={setPosts} >posts</Button>
			{isLoading
				? 'Loading'
				: data.map(({id, body}) => <li key={id} >{body}</li>)}
		</div>
		)
}

const Button = memo(({setPath, children}) => {
	console.log(`${children} rendered`)
	return (
		<button onClick={setPath} >{children}</button>
		)
})
export default UseCallback2