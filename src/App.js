import React from 'react';

const list = [{
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

function App() {
    return (
        <div>
<h1>HOLA REACT}</h1>
<label htmlFor="search">Search: </label>
<input type="text" id='search' />

<hr />
<List />
<List />
<List />
</div>
    );
}

function List() {
    return list.map(function(item) {
        return (
            <div key={item.objectID}>
<span>
<a href={item.url} style={item.style}>{item.title}</a>
</span>
<span>{item.author}</span>
<span>{item.num_comments}</span>
<span>{item.points}</span>
</div>
        );
    });
}

export default App;