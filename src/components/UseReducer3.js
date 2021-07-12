import React, { useReducer } from 'react';
const getRamdomNumber = (arr) => {
	return Math.floor(Math.random() * 10 + 1)
}

const getRamdomNumbers = () => {
	let arr = [];
	for (let i=0; i < 10; i++) {
		arr.push(getRamdomNumber(arr))
	}
	return arr
}

const initialState = getRamdomNumbers()

const reducer = (state, action) => {
	console.log('jdjdjd')
	switch (action.type){
		case 'ORDER':
			return [...state]. sort((a, b) => a - b)
		case 'GET_RANDOM_NUMBERS':
			return getRamdomNumbers()
	}
}

const UseReducer3 = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	return (
		<div>
		<button onClick={() => dispatch({type: 'ORDER'})} >Order numbers</button>
		<button onClick={() => dispatch({type: 'GET_RANDOM_NUMBERS'})} >Get new numbers</button>
			{state.map((n, i, arr) => {
				return i !== arr.length - 1 ? n+'-' : n
			})}
		</div>
		)
}

export default UseReducer3