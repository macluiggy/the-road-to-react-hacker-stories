import React, {useRef, useState} from 'react';


const CharactersLeft = () => {
	 const [text, setText] = useState('')
	let textareaRef = useRef()
	const updateCharactersLeft = () => {
		console.log(textareaRef.current.value)
		setText(textareaRef.current.value)
	}

	let leftNumberOfCharacters = 10 - text.length
	return (
		<div>
			<textarea
			 name="text"
			 id="text"
			 cols="30"
			 rows="10"
			 ref={textareaRef}
			 onInput={updateCharactersLeft}
			 style={{
			 	border: leftNumberOfCharacters < 0 ? 'solid red' : 'solid green',
			 	outline: 'none',
			 	position: 'relative',
			 	left: `${text.length*10}px`
			 }} ></textarea>
			<p>{leftNumberOfCharacters} left</p>
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