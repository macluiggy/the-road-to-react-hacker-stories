import React, { useState, useEffect } from 'react';

const API = () => {
    const [value, setValue] = useState('posts');
    const [value2, setValue2] = useState([])
    useEffect(() => {
    	const bringData = async () => {
	        let data = await fetch('https://jsonplaceholder.typicode.com/' + value)
	        let res = await data.json()
	        setValue2(res)
    	}
        bringData()
    }, [value2, setValue2])

    return (
        <div>
			<Input
			value='posts'
			id='one'
			setValue={() => setValue('posts')} />
			<Input
			value='comments'
			id='two'
			setValue={() => setValue('comments')} />

			<ul>
				{value2.map(({id, body})=> <li key={id}>{body}</li>)}
			</ul>
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
export default API