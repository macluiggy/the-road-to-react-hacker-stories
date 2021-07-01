import React from 'react';
//import PRACTICING from './PRACTICING.js'
//import API from './API'
//import UseRef from './components/useRef';
//import Images from './components/images';
//import CharactersLeft from './components/charactersLeft';

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
    const stories = [{
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

    const [searchTerm, setSearchTerm] = useSemiPersistenceStatesss('search', 'React');
    //console.log(searchTerm)

    const handleSearch = event => {
        let v = event.target.value;
        setSearchTerm(v);
    }

    const searchedStories = stories.filter(story =>
        story./*author*/title
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
            <List list={searchedStories}/>

        {/*PRACTICING COMPONENTS*/}
        <hr />
        {/*<PRACTICING />*/}
        {/*<API />*/}
        {/*< UseRef />*/}
        {/*<Images />*/}
        {/*<CharactersLeft />*/}
        </div>
    )
}

//console.log(estaVaribleNoEstáDefinida)
//este cambio fue hecho en la rama2
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
        

const List = ({list}) => list.map(({objectID:id, ...item}) => <Item key={id} {...item} />);

const Item = ({title:titulo, url, author, num_comments, points, style, }) => 
    <div> 
            <span>
            <a href={url} style={style}>{titulo}</a>
            </span>
            <span>{author}</span>
            <span>{num_comments}</span>
            <span>{points}</span>
    </div>


export default App;