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
  const component = renderer.create(<Item item={item} />);

  /*it('render all properties', () => {

    expect(component.root.findByType('a').props.href).toEqual(
      'https://reactjs.org/'
    )
    expect(
      component.root.findAllByType('span')[1].props.children
    ).toEqual('Jordan Walke')
  });*/

  it('render all properties', () => {

    expect(component.root.findByType('a').props.href).toEqual(
      'https://reactjs.org/'
    )
    expect(
      component.root.findAllByType('span')[1].props.children
    ).toEqual('Jordan Walke')

    expect(
      component.root.findAllByProps({ children: 'React' })
        .length
    ).toEqual(1)
  });

  it('calls onRemoveItem on button click', () => {
    const handleRemoveItem = jest.fn();

    const component = renderer.create(
      <Item  item={item} onRemoveItem={handleRemoveItem} />
    )

    component.root.findByType('button').props.onClick();

    expect(handleRemoveItem).toHaveBeenCalledTimes(1)
    expect(handleRemoveItem).toHaveBeenCalledTimes(item);

    expect(component.root.findAllByType(Item).length).toEqual(1)
  })
  it(`poinst equal to ${item.points}`, () => {
      expect(component.root.findAllByType('span')[3].props.children)
      .toEqual(4)
    });
})