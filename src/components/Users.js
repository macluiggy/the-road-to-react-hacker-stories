import React from 'react';

const users = [
  { id: '1', firstName: 'Robin', lastName: 'Wieruch' },
  { id: '2', firstName: 'Dennis', lastName: 'Wieruch' },
];
 
function Users() {
  return (
    <div>
      <h1>Hello Conditional Rendering</h1>
      <List list={users} />
    </div>
  );
}
 
function List({ list }) {
  if (!list) {
    return null;
  }
 
  if (!list.length) {
    return <p>Sorry, the list is empty.</p>;
  } 
  return (
      <div>
        {list.map(item => (
          <Item item={item} />
        ))}
      </div>
    );
}
 
function Item({ item }) {
  return (
    <li>
      {item.firstName} {item.lastName}
    </li>
  );
}

export default Users;