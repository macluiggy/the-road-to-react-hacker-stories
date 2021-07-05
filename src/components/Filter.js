import React, {useState, useEffect, useRef} from 'react';
let p = (t) => console.log(t)
const moviesArr = [
	{
		id: 0,
		movie: 'movie1',
		age: 0,
	},
	{
		id: 1,
		movie: 'movie2',
		age: 18,
	},
	{
		id: 2,
		movie: 'movie3',
		age: 10
	}
]
const Filter = () => {
	const [movies, setMovies] = useState(moviesArr)
	const [minAge, setMinAge] = useState(0)
	const inputRef = useRef()
	const changeAge = () => {
		setMinAge(inputRef.current.value);
		p(inputRef.current.value)
	}
	useEffect(() => {
		let filteredMovies = moviesArr.filter(({age, id, movie}) => minAge <= age);
		setMovies(filteredMovies)
		p('se cambio la edad')

		filteredMovies = []
		return filteredMovies
	}, [minAge, setMinAge])
	return (
		<div>
			<Input
				id='ages'
				type='number'
				value={minAge}
				changeAge={changeAge}
				inputRef={inputRef}
			>
			Select your age <br />
			</Input>
			<ul>
				{movies.map(({age, movie, id}) => <li key = {id}>{movie}</li>)}
			</ul>
		</div>
		)
}

const Input = ({id, type='button', value='button', changeAge, children, inputRef, minAge}) => 
	<>
		<label htmlFor={id}>{children}</label>
		<input 
		type={type} 
		id={id}
		onChange={changeAge}
		ref={inputRef}
		value={minAge} >
		
		</input>
	</>

export default Filter;