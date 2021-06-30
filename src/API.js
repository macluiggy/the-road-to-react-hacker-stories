import React, { useState, useEffect, useRef } from 'react';

const API = () => {
    const [value, setValue] = useState('posts');
    const [value2, setValue2] = useState([]);
    const ref = useRef('posts')
    useEffect(() => {
    	const bringData = async () => {
	        let data = await fetch('https://jsonplaceholder.typicode.com/' + ref.current)
	        if (data.status !== 200) setValue2('loading')
	        let res = await data.json()
	        setValue2(res)
	        console.log(data.status)
    	}
        return bringData()
    }, [ref.current])

    return (
        <div>
			<Input
			value='posts'
			id='one'
			setValue={() => ref.current = 'posts'} />
			<Input
			value='comments'
			id='two'
			setValue={() => ref.current = 'comments'} />

			<ul>
				{!value2 ? 'Loading' : value2.map(({id, body})=> <li key={id}>{body}</li>)}
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