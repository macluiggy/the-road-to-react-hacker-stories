import { Fragment, useState, useEffect, useReducer } from 'react';
import axios from 'axios';



const getRamdomColor = () => {
	const rN = () => Math.floor(Math.random() * 255 + 1);
	return `rgb(${rN()}, ${rN()}, ${rN()})`;
}

const dataFetchReducer = (state, action) => {
	switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
}

const useDataApi = (initialUrl, initialData) => {
	//const [data, setData] = useState(initialData);
	const [url, setUrl] = useState(initialUrl)
	//const [isLoading, setIsLoading] = useState(false)
	//const [isError, setIsError] = useState(false)
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		isError: false,
		data: initialData//
	})  

	useEffect(() => {
		let didCancel = false;

		//console.log(`jsjsjjs`)
		const fetchData = async () => {
			//setIsError(false)
			//setIsLoading(true)
			dispatch({ type: 'FETCH_INIT' })
			
			try {
				const result = await axios(url);

				//setData(result.data);
				if (!didCancel) {
					dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
				}
			} catch (error) {
				//setIsError(true)
				if (!didCancel) {
					dispatch({ type: 'FETCH_FAILED' })
				}
			}

			//setIsLoading(false)
		}

		fetchData()

		return () => {
			didCancel = true
		};
	}, [url])

	return [state, setUrl]
}

const AsyncAwait = () => {
	const [query, setQuery] = useState('redux');
	const [{ isError, data, isLoading}, doFetch] = useDataApi(
	    'https://hn.algolia.com/api/v1/search?query=redux',
	    { hits: [] },
  	);

	return (
		<Fragment>
			<form onSubmit={e => {
				doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`)
				e.preventDefault()
			}} >
				<input
				 type="text"
				 value={query}
				 onChange={e => setQuery(e.target.value)} 
				/>
				<button disabled={!query} >Search</button>
			</form>

			{isError && <div>Something went wrong ...</div>}
			{isLoading ? (
				<div>Loading</div>
				) : (
				<ul style={{border: `solid ${getRamdomColor()}`}} >
					{data.hits.map(item => (
						<li key={item.objectID} >
							<a href={item.url}>{item.title}</a>
						</li>
						))}
				</ul>
				)}
		</Fragment>
		)
}

export default AsyncAwait