import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';



const getRamdomColor = () => {
	const rN = () => Math.floor(Math.random() * 255 + 1);
	return `rgb(${rN()}, ${rN()}, ${rN()})`;
}

const AsyncAwait = () => {
	const [data, setData] = useState({hits: []});
	const [query, setQuery] = useState('redux');
	const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=redux')

	useEffect(() => {
		//console.log(`jsjsjjs`)
		const fetchData = async () => {
			const result = await axios(url);

			setData(result.data);
		}
		fetchData()
	}, [url])

	return (
		<Fragment>
			<input
			 type="text"
			 value={query}
			 onChange={e => setQuery(e.target.value)} 
			/>
			<button
			 disabled={!query}
			 onClick={e => setUrl((`https://hn.algolia.com/api/v1/search?query=${query}`))} 
			>
				search
			</button>
			<ul style={{border: `solid ${getRamdomColor()}`}} >
				{data.hits.map(item => (
					<li key={item.objectID} >
						<a href={item.url}>{item.title}</a>
					</li>
					))}
			</ul>
		</Fragment>
		)
}

export default AsyncAwait