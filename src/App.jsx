import React from 'react';
import axios from 'axios';

import styles from './App.module.scss';
import cs from 'classnames';
import styled from 'styled-components';
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
//import UseReducer4 from './components/UseReducer4';
//import UseCallback from './components/UseCallback'
//import UseCallback2 from './components/UseCallback2'
//import AsyncAwait from './components/AsyncAwait'
//import HookMigration from './components/HookMigration'
//import ReactComponent from './components/ReactComponent'
//import ComponentTypes from './components/ComponentTypes'


const StyledContainer = styled.div`
height: 100vw;
padding: 20px;
background: #83a4d4;
background: linear-gradient(to left, #b6fbff, #83a4d4);
color: #171212;
`;
const StyledHeadlinePrimary = styled.h1`
font-size: 48px;
font-weight: 300;
letter-spacing: 2px;
`;
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
    const [url, setUrl] = React.useState(
            `${API_ENDPOINT}${searchTerm}`
        )
    //const [isLoading, setIsLoading] = React.useState(false);
    //const [isError, setIsError] = React.useState(false);

    const handleFetchStories = React.useCallback( async () => {
        //if (!searchTerm) return;

        dispatchStories({ type: 'STORIES_FETCH_INIT' });

        /*getAsyncStories()*/
        /*fetch(url)
            .then(response => response.json())
            .then(result => {
                dispatchStories({
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.hits,
                })
            })
            .catch(() => 
                  dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
                );*/
        /*axios
            .get(url)
            .then(result => {
                dispatchStories({
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.data.hits
                })
            })
            .catch(() => {
                dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
            })*/
            try {
                const result = await axios.get(url);

                dispatchStories({
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.data.hits,
                })
            } catch {
                dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
            }
    }, [url])
    //console.log(searchTerm)

    React.useEffect(() => {
        handleFetchStories();
    }, [handleFetchStories])
    
    const handleRemoveStory = item => {
        dispatchStories({
            type: 'REMOVE_STORIES',
            payload: item,
        });
    }
    /*const handleSearch = event => {
        let v = event.target.value;
        setSearchTerm(v);
    }*/

    const handleSearchInput = event => {
        setSearchTerm(event.target.value);
    }

    const handleSearchSubmit = event => {
        setUrl(`${API_ENDPOINT}${searchTerm}`)

        event.preventDefault()
    }

/*    const searchedStories = stories.data.filter(story =>
        story.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))*/;

    return (
        <StyledContainer className={styles.container}>
            <StyledHeadlinePrimary>My Hacker Stories</StyledHeadlinePrimary>
            <SearchForm
                searchTerm={searchTerm}
                onSearchInput={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}
                className='button button_large'
            />


            {/*
            <UseCallback />
            <UseCallback2 />
            <AsyncAwait />
            <HookMigration />
            <ReactComponent />
            <ComponentTypes />
            */}

            {stories.isError && <p>Something went wrong...</p>}

            {stories.isLoading ? (
                <p>Loading...</p>
                ) : (
                <List list={stories.data} onRemoveItem={handleRemoveStory} />
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
        </StyledContainer>
    )
}


//console.log(estaVaribleNoEstáDefinida)
const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
    className,
}) => (
        <form onSubmit={onSearchSubmit} className='search-form'>
            <InputWithLabel
            id="search"
            value={searchTerm}
            isFocused
            onInputChange={onSearchInput}
            >
            <strong>Search:</strong>
            </InputWithLabel>
            <button
             type="submit"
             disabled={!searchTerm}
             className={cs(styles.button, styles.buttonLarge)}>
            Submit
            </button>
        </form>
    )
//const SimpleTextComponent = () => 'Search: ';

/*const InputWithLabel = ({
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
}*/

class InputWithLabel extends React.Component {
    constructor(props) {
        super(props);

        this.inputReff = React.createRef();
    }

    componentDidMount() {
        if (this.props.isFocused) {
            this.inputReff.current.focus()
        }
    }

    render() {
        const {
            id,
            value,
            type = 'text',
            onInputChange,
            children,
        } = this.props;

        return (
            <>
                <label htmlFor={id} className={styles.label}><em>{children}</em> </label>
                <input
                ref={this.inputReff}
                type={type}
                id={id} 
                onChange={onInputChange}
                value={value}
                className={styles.input} />

            </>
            )
    }
}
        

const List = ({list, onRemoveItem}) => 
    list.map(item => (
        <Item 
            key={item.objectID} 
            item={item}
            onRemoveItem={onRemoveItem} 
        />
        ));


const StyledItem = styled.div`
display: flex;
align-items: center;
padding-bottom: 5px;
`;

const StyledColumn = styled.span`
padding: 0 5px;
white-space: nowrap;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
a {
color: red;
}
width: ${props => props.width};
`;

const StyledButton = styled.button`
background: transparent;
border: 1px solid #171212;
padding: 5px;
cursor: pointer;
transition: all 0.1s ease-in;
&:hover {
background: #171212;
color: #ffffff;
}
`;

const Item = ({ item, onRemoveItem }) => (
  <StyledItem>
    <span style={{ width: '40%' }}>
      <a href={item.url}>{item.title}</a>
    </span>
    <StyledColumn width='30%'>{item.author}</StyledColumn>
    <StyledColumn width="10%">{item.num_comments}</StyledColumn>
    <StyledColumn width="10%">{item.points}</StyledColumn>
    <StyledColumn width="10%">
      <StyledButton
       type="button"
       onClick={() => onRemoveItem(item)}
      >
        Dismiss
      </StyledButton>
    </StyledColumn>
  </StyledItem>
);


export default App;