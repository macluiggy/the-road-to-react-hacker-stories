import React from 'react';
//import PRACTICING from './PRACTICING.js'
//import API from './API'
//import UseRef from './components/useRef';
//import Images from './components/images';
//import CharactersLeft from './components/charactersLeft';
//import Like from './components/like';
//import Filter from './components/Filter'
//import Filter2 from './components/Filter2'
import Users from './components/Users.js'


const initialStories = [{
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
    ];
const storiesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_STORIES':
            return action.payload;
        case 'REMOVE_STORIES':
            return state.filter(
                    story => action.payload.objectID !== story.objectID
                );
        default:
            throw new Error();
    }
}
const getAsyncStories = () =>
    new Promise(resolve =>
            setTimeout(
                 () => resolve({data: {stories: initialStories}}),
                 2000
                )
        )

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

const App = () => {

    const [searchTerm, setSearchTerm] = useSemiPersistenceStatesss('search', 'React');
    const [stories, dispatchStories] = React.useReducer(
            storiesReducer, 
            []
        );
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        getAsyncStories().then(result => {
            dispatchStories({
                type: 'SET_STORIES',
                payload: result.data.stories,
            });
            setIsLoading(false);
        })
        .catch(() => setIsError(true));
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

    const searchedStories = stories.filter(story =>
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

            {isError && <p>Something went wrong...</p>}

            {isLoading ? (
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
        <Users />
        </div>
    )
}

//console.log(estaVaribleNoEstáDefinida)
//este cambio fue hecho en la rama2.1

//este cambio fue hecho en la rama2
//otro comentario en la rama 2 jejeje
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

//comentario añadido en main