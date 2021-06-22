import React from 'react';



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

    const [searchTerm, setSearchTerm] = React.useState(
        localStorage.getItem('identificador') || 'React'
        );
    //console.log(searchTerm)

    React.useEffect(() => {
        localStorage.setItem('identificador', searchTerm)
        console.log(localStorage.getItem('identificador'))
    }, [searchTerm])
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

            <Search onSearch={handleSearch} search={searchTerm} />


            <hr />
            <List list={searchedStories}/>
        </div>
    )
}
//

const Search = ({search, onSearch}) =>
        <div>
            <label htmlFor="search">Search: </label>
            <input 
            type="text" 
            id='search' 
            onChange={onSearch}
            value={search} />

        </div>

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