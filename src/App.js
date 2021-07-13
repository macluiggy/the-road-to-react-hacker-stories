import React from 'react';
//import PRACTICING from './PRACTICING.js'
//import API from './API'
//import UseRef from './components/useRef';
//import Images from './components/images';
//import CharactersLeft from './components/charactersLeft';
//import Like from './components/like';
//import Filter from './components/Filter'
//import Filter2 from './components/Filter2'
//import Users from './components/Users.js'
//import UseReducer from './components/UseReducer';
//import UseReducer2 from './components/UseReducer2';
//import UseReducer3 from './components/UseReducer3';
import UseReducer4 from './components/UseReducer4';



/*const initialStories = [{
            title: 'React',
            url: 'https://reactjs.org/',
            author: 'Jordan Walke',
            num_comments: 3,
            points: 4,
            objectID: 0,
            style: {
                border: 'solid red',
            }
        },
        {
            title: 'Redux',
            url: 'https://redux.js.org/',
            author: 'Dan Abramov, Andrew Clark',
            num_comments: 2,
            points: 5,
            objectID: 1,
            style: {
                border: 'solid blue'
            }
        },
    ];*/
const storiesReducer = (state, action) => {
    switch (action.type) {
        case 'STORIES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'STORIES_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'STORIES_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case 'REMOVE_STORIES':
            return {
                ...state,
                data: state.data.filter(
                    story => action.payload.objectID !== story.objectID
                ),
            };
        default:
            throw new Error();
    }
}
/*const getAsyncStories = () =>
    new Promise((resolve, reject) => setTimeout(reject, 2000));*/

const useSemiPersistenceStatesss = (key, initialState) => {
    const [value, setValue] = React.useState(
        localStorage.getItem(key) || initialState
        )

    React.useEffect(() => {
            localStorage.setItem(key, value)
            //console.log(localStorage.getItem('identificador'))

        }, [value, key]);

        return [value, setValue]
}

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
const App = () => {

    const [searchTerm, setSearchTerm] = useSemiPersistenceStatesss('search', 'React');
    const [stories, dispatchStories] = React.useReducer(
            storiesReducer, 
            {data: [], isLoading: false, isError: false}
        );
    //const [isLoading, setIsLoading] = React.useState(false);
    //const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        dispatchStories({ type: 'STORIES_FETCH_INIT' });
        /*getAsyncStories()*/
        fetch(`${API_ENDPOINT}react`)
            .then(response => response.json())
            .then(result => {
                dispatchStories({
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.hits,
                })
            })
            .catch(() => 
                  dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
                );
    }, [])
    //console.log(searchTerm)
    const handleRemoveStory = item => {
        dispatchStories({
            type: 'REMOVE_STORIES',
            payload: item,
        });
    }
    const handleSearch = event => {
        let v = event.target.value;
        setSearchTerm(v);
    }

    const searchedStories = stories.data.filter(story =>
        story.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

    return (
        <div>
            <h1>My Hacker Stories</h1>
            <InputWIthLabel
             id='search'
             value={searchTerm}
             label='Search'
             isFocused
             onInputChange={handleSearch}
             //type='number'
            >
            <strong><SimpleTextComponent /*
            se pueden pasar componentes en los React childrens
            *//></strong>
            </InputWIthLabel>

            <hr />

            {stories.isError && <p>Something went wrong...</p>}

            {stories.isLoading ? (
                <p>Loading...</p>
                ) : (
                <List list={searchedStories} onRemoveItem={handleRemoveStory} />
                )}

        {/*PRACTICING COMPONENTS*/}
        <hr />
        {/*<PRACTICING />*/}
        {/*<API />*/}
        {/*< UseRef />*/}
        {/*<Images />*/}
        {/*<CharactersLeft />*/}
        {/*<Like />*/}
        {/*<Filter />*/}
        {/*<Filter2 />*/}
        {/*<Users />*/}
        {/*<UseReducer />*/}
        {/*<UseReducer2 />*/}
        {/*<UseReducer3 />*/}
        {/*<UseReducer4 />*/}
        </div>
    )
}

//console.log(estaVaribleNoEstáDefinida)

const SimpleTextComponent = () => 'Search: ';

const InputWIthLabel = ({
                         id,
                         label,
                         onInputChange,
                         value,
                         type = 'text',
                         isFocused,
                         children}) => {
     const inputRef = React.useRef();

     React.useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
     }, [isFocused])
    return (
        <>
            <label htmlFor={id}><em>{children}</em> </label>
            <input
            ref={inputRef}
            type={type}
            id={id} 
            onChange={onInputChange}
            autoFocus={isFocused}
            value={value} />

        </>
        )
}
        

const List = ({list, onRemoveItem}) => 
    list.map(item => (
        <Item 
            key={item.objectID} 
            item={item}
            onRemoveItem={onRemoveItem} 
        />
        ));


const Item = ({ item, onRemoveItem }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </div>
);


export default App;