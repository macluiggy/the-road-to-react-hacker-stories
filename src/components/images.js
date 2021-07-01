import React, { useState, useEffect, useRef } from 'react';
import './images.css'

const Images = () => {
	const getRamdom = () => Math.floor(Math.random() * 5000 + 1);
	const [number, setNumber] = useState(getRamdom);
	const [url, setUrl] = useState('');
	let ref = useRef(0);
	let buttonRef = useRef()

	let imageRef = useRef()
	let animate = () => {
		imageRef.current.className = 'animate';
	}
	useEffect(() => {
		if (ref.current === 0) {
			ref.current += 1;
			return
		}
		const data = async () => {
			let fetchData = await fetch('https://jsonplaceholder.typicode.com/photos');
			let res = await fetchData.json();
			setUrl(res[number].url)
		}
		console.log('el numero a cambiado')
		return data()
	}, [number, setNumber])
	return (
		<div>
			<Input
			value='get ramdom image'
			setValue={() => setNumber(getRamdom())} />
			<button ref={buttonRef} onClick={() => {
				buttonRef.current.style.backgroundColor = `rgb(${255*Math.random()}, ${255}, ${255*Math.random()})`
			}}>change my color</button>
			<button onClick={animate}>animate</button>
			<br />
			<img src={url} alt="" className="static" ref={imageRef}/>
		</div>
		)
}

const Input = ({ id, type = 'button', value = 'button', setValue }) =>
    <>
	    <label htmlFor={id}></label> 
	    <input
			type = { type }
			value = { value }
			id = { id }
			onClick = { setValue } >
	    </input> 
    </>
export default Images