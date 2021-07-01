import React, {useRef, useState, useEffect} from 'react';


const CharactersLeft = () => {
	const [text, setText] = useState('')
	const [style, setStyle] = useState()
	const [warning, setWarning] = useState('')
	let textareaRef = useRef()
	let ulRef = useRef()
	const updateCharactersLeft = () => {
		//console.log(textareaRef.current.value)
		setText(textareaRef.current.value)

	}
	const addText = () => {
		console.log(textareaRef.current.value === text)
		if (text.length > 10) {
			setWarning('number of characters exceeded')
			console.log('se excedio')
			return 
		}
		setWarning('')
		ulRef.current.innerHTML += `<li>${text}</li>`;
	}
	useEffect(() => {
		setStyle({
			 	border: 10-text.length < 0 ? 'solid red' : 'solid green',
			 	outline: 'none',
			 	position: 'relative',
			 	left: `${text.length*10}px`
			 })
		//console.log('se renderizo')
	}, [text, setText])
	
	return (
		<div>
			<textarea
			 name="text"
			 id="text"
			 cols="30"
			 rows="10"
			 ref={textareaRef}
			 onInput={updateCharactersLeft}
			 style={style} ></textarea>
			<p>{10-text.length} left</p><p>{warning}</p>
			<Input
			type='submit'
			value='submit'
			addText={addText} />
			<ul ref={ulRef}>
				
			</ul>
		</div>
		)
}

const Input = ({id, type='button', value='button', addText}) => 
	<>
		<label htmlFor={id}></label>
		<input 
		type={type} 
		value={value} 
		id={id}
		onClick={addText} >
		
		</input>
	</>
export default CharactersLeft;