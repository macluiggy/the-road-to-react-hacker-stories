import React, {useState, useEffect} from 'react';


const useColor = () => {
	const [value, setValue] = useState(Math.random());
	return [value, setValue]
}

const PRACTICING = () => {
	const [color, setColor] = useColor();

	useEffect(() => {
		const interval = setInterval(() => setColor(Math.random() * 255 + 1), 1000)
		return () => clearInterval(interval);
	}, [color, setColor])
	const changeColor = () => {
		let rN = Math.floor(Math.random() * 255 + 1)
		setColor(rN)
	}

	return 	<div style={{backgroundColor: `rgb(${color*Math.random()}, ${color}, ${color*Math.random()})`}} >
				<Input 
				id='btn'
				type='submit'
				value='change color'
				changeColor={changeColor} />
			</div>
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
export default PRACTICING