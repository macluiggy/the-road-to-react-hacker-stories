/*import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/
import React from 'react';
import renderer from 'react-test-renderer';

import { SearchForm, InputWithLabel, List, Item } from './App.tsx';

/*describe('Something truthy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => expect(false).toBe(false));
})*/

describe('Item', () => {
  const item = {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  };

  it('render all properties', () => {
    const component = renderer.create(<Item item={item} />);

    expect(component.root.findByType('a').props.href).toEqual(
      'https://reactjs.org/'
    )
  })
})