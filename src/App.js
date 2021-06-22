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

    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    }

    const searchedStories = stories.filter(story =>
        story./*author*/title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

    return (
        <div>
            <h1>My Hacker Stories</h1>

            <Search onSearch={handleSearch} />


            <hr />
            <List list={searchedStories}/>
        </div>
    )
}
//

const Search = props => {


    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input 
            type="text" 
            id='search' 
            onChange={props.onSearch} />

        </div>
    )
}

const List = propsss => propsss.list.map(item =>
    <div key={item.objectID}>
            <span>
            <a href={item.url} style={item.style}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
    </div>
);


export default App;