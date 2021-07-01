import React, {} from 'react';


const CharactersLeft = () => {


	return (
		<div>
			<Input />
		</div>
		)
}

const Input = ({id, type='button', value='button', changeColor}) => 
	<>
		<label htmlFor={id}></label>
		<input 
		type={type} 
		value={value} 
		id={id}
		onClick={changeColor} >
		
		</input>
	</>
export default CharactersLeft;