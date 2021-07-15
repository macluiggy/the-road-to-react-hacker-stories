import { useState } from 'react';



const getRamdomColor = () => {
	const rN = () => Math.floor(Math.random() * 255 + 1)
	return `rgb(${rN()}, ${rN()}, ${rN()})`
}

const AsyncAwait = () => {
	const [data, setData] = useState({hits: []});

	return (
		<ul style={{border: `solid ${getRamdomColor()}`}} >
			{data.hits.map(item => (
				<li key={item.objectID} >
					<a href={item.url}>{item.title}</a>
				</li>
				))}
		</ul>
		)
}

export default AsyncAwait