import React, {useState, useEffect, useRef} from 'react';
let p = (t) => console.log(t)
const moviesArr = [
	{
		id: 0,
		category: 'action comedy drama',
		movie: 'fast and furious',
		age: 0,
	},
	{
		id: 1,
		category: 'drama, mistery',
		movie: 'death note',
		age: 18,
	},
	{
		id: 2,
		category: 'mistery, drama',
		movie: 'dark',
		age: 10
	},
	{
		id: 3,
		category: 'comedy ',
		movie: 'los tres chiflados',
		age: 10
	}
]
const Filter2 = () => {
	const [movies, setMovies] = useState(moviesArr)
	const [currentCategory, setCurrentCategory] = useState()
	const inputRef = useRef()
	const changeCatergory = (e) => {
		setCurrentCategory(e.target.value);
		p(e.target.value)
		p('thriller comedy terror'.includes(e.target.value))
	}

	useEffect(() => {
		if(!currentCategory) return
			setMovies(moviesArr.filter(({category}) => category.includes(currentCategory)))

	}, [currentCategory, setCurrentCategory])
	return (
		<div>
			<Input
				id='ages'
				value='action'
				changeAge={changeCatergory}
				inputRef={inputRef}
			>
			Select the category of the movie <br />
			</Input>
			<Input
				id='ages'
				value='comedy'
				changeAge={changeCatergory}
				inputRef={inputRef}
			/>
			<Input
				id='ages'
				value='drama'
				changeAge={changeCatergory}
				inputRef={inputRef}
			/>
			<Input
				id='ages'
				value='mistery'
				changeAge={changeCatergory}
				inputRef={inputRef}
			/>
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
		ref={inputRef}
		value={value}
		onClick={changeAge} >
		
		</input>
	</>

export default Filter2;