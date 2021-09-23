import React from 'react';
import axios from 'axios';

import styles from './App.module.scss';
import cs from 'classnames';
import styled from 'styled-components';
import { ReactComponent as Check } from './check.svg';
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
//import Memo from './components/memo'

import List from './List';
import SearchForm from './SearchForm/'


type Story = {
        objectID: string;
        url: string;
        title: string;
        author: string;
        num_comments: number;
        points: number;
    }

type Stories = Array<Story>;

type listProps = {
    list: Stories;
    onRemoveItem: (item: Story) => void;
}
/*type itemProps = {
    item: Story;
    onRemoveItem: (item: Story) => void;
}*/

type StoriesState = {
    data: Stories;
    isLoading: boolean;
    isError: boolean;
}

/*type StoriesAction = {
    type: string;
    payload: any;
}*/

interface StoriesFetchInitAction {
    type: 'STORIES_FETCH_INIT';
}

interface StoriesFetchSuccessAction {
    type: 'STORIES_FETCH_SUCCESS';
    payload: Stories;
}

interface StoriesFetchFailureAction {
    type: 'STORIES_FETCH_FAILURE';
}

interface StoriesRemoveAction {
    type: 'REMOVE_STORY';
    payload: Story;
}

type StoriesAction = 
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | StoriesRemoveAction

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
const storiesReducer = (
    state: StoriesState,
    action: StoriesAction
) => {
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

const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const getUrl = searchTerm =>`${API_BASE}${API_SEARCH}${PARAM_SEARCH}${searchTerm}`;

const extractSearchTerm = url =>
    url
      .substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'))
      .replace(PARAM_SEARCH, '');

const getLastSearches = urls =>
  urls
  .reduce((result, url, index) => {
        const searchTerm = extractSearchTerm(url);
        if (index === 0) {
            return result.concat(searchTerm);
        }
        const previousSearchTerm = result[result.length - 1];
        if (searchTerm === previousSearchTerm) {
            return result;
        } else {
            return result.concat(searchTerm);
        }
    }, [])
    .slice(-5)
    .slice(0, -1)
    .map(extractSearchTerm);

const useSemiPersistenceStatesss = (
    key: string, 
    initialState: string,
): [string, (newValue: string) => void] => {
    const isMounted = React.useRef(false);

    const [value, setValue] = React.useState(
        localStorage.getItem(key) || initialState
        )

    React.useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            //console.log(localStorage.getItem('identificador'))
        } else {
            console.log('A')
            localStorage.setItem(key, value)
        }

    }, [value, key]);

        return [value, setValue]
}
const getSumComments = stories => {
    console.log('C')
    return stories.data.reduce(
        (result, value) => result + value.num_comments,
        0
    )
}

const App = () => {
    console.log('B:App')
    const [searchTerm, setSearchTerm] = useSemiPersistenceStatesss('search', 'React');

    // important: still wraps the returned value in []
    const [urls, setUrls] = React.useState([getUrl(searchTerm)]);

    const [stories, dispatchStories] = React.useReducer(
            storiesReducer, 
            {data: [], isLoading: false, isError: false}
        );
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
                const lastUtl = urls[urls.length - 1];
                const result = await axios.get(lastUtl);

                dispatchStories({
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.data.hits,
                })
            } catch {
                dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
            }
    }, [urls])
    //console.log(searchTerm)

    React.useEffect(() => {
        handleFetchStories();
    }, [handleFetchStories])
    
    const handleRemoveStory = (item: Story) => {
            dispatchStories({
                type: 'REMOVE_STORIES',
                payload: item,
            });
        }
    /*const handleSearch = event => {
        let v = event.target.value;
        setSearchTerm(v);
    }*/

    const handleSearchInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchTerm(event.target.value);
    }
    //console.log('log message'.split('').slice(-5) + 'zzzzzzz')
    const handleSearchSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        //const url = `${API_ENDPOINT}${searchTerm}`;
        //setUrls(urls.concat(url))
        handleSearch(searchTerm)

        event.preventDefault()
    }

    const handleLastSearch = searchTerm => {
            //do something
            //const url = `${API_ENDPOINT}${searchTerm}`;
            //setUrls(url.concat(url));
            setSearchTerm(searchTerm)

            handleSearch(searchTerm)
    }

    const handleSearch = searchTerm => {
        const url = getUrl(searchTerm)
        setUrls(urls.concat(url));
    }
/*    const searchedStories = stories.data.filter(story =>
        story.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))*/;
    const lastSearches = getLastSearches(urls);

    const sumComments = React.useMemo(() => getSumComments(stories), [stories]);

    

    return (
        <StyledContainer className={styles.container}>
            <StyledHeadlinePrimary>My Hacker Stories with {sumComments} comments.</StyledHeadlinePrimary>
            <SearchForm
                searchTerm={searchTerm}
                onSearchInput={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}
                className='button button_large'
            />

            <LastSearches
              lastSearches={lastSearches}
              onLastSearches={handleLastSearch}
            />
            {/*
            <UseCallback />
            <UseCallback2 />
            <AsyncAwait />
            <HookMigration />
            <ReactComponent />
            <ComponentTypes />
            <Memo />
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

const LastSearches = ({ lastSearches, onLastSearches }) => (
    <>
        {lastSearches.map((searchTerm, index) => (
            <button
              key={searchTerm+index}
              type='button'
              onClick={() => onLastSearches(searchTerm)}
            >
                {searchTerm}
            </button>
        ))}
    </>
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



export default App;