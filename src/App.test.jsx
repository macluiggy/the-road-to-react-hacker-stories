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
  const handleRemoveItem = jest.fn();

  let component;

  beforeEach(() => {
    component = renderer.create(
      <Item item={item} onRemoveItem={handleRemoveItem} />
    )
  })

  it('render all properties', () => {
    const component = renderer.create(<Item item={item} />);
    expect(component.root.findByType('a').props.href).toEqual(
      'https://reactjs.org/'
    )
    expect(
      component.root.findAllByType('span')[1].props.children
    ).toEqual('Jordan Walke')
    expect(
      component.root.findAllByProps({children: 'Jordan Walke'}).length
    ).toEqual(2)

    //Se espera encontrar un solo tipo de elemento 'a' y que su children
    //sea igual a 'React'
    expect(
      component.root.findByType('a').props.children
    ).toEqual('React');
    //este test es basicamente igual al anterior, se espera el mismo resultado
    // solo que aqui se usa 'findAllByProps' y un objeto que contiene la prop deseada
    expect(
      component.root.findAllByProps({ children: 'React' })
        .length
    ).toEqual(1)
  });

  it('calls onRemoveItem on button click', () => {
    const handleRemoveItem = jest.fn();//crea un simulacro de la funcion

    const component = renderer.create(
      <Item  item={item} onRemoveItem={handleRemoveItem} />//crea un componente jest
    )

    //encuentra de ese componente el elemento react que sea boton y llama a la funcion
    //que se encuentra en este elemento
    component.root.findByType('button').props.onClick();

    //haz el test que espera que la funcion haya sido llamada 1 vez
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    //se hace el test de que la funcion haya sido invocada con el argumento item
    expect(handleRemoveItem).toHaveBeenCalledWith(item);

    //testea que la cantidad de componentes Item sea igual a uno
    expect(component.root.findAllByType(Item).length).toEqual(1)
  })
  it(`poinst equal to ${item.points}`, () => {
    const component = renderer.create(<Item item={item} />);
      expect(component.root.findAllByType('span')[3].props.children)
      .toEqual(4)
    });
})

describe('List', () => {
  const list = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ]

  it('renders two items', () => {
    //crea la funcion jest para que tome el lugar de la funcion del evento
    //cuando sea llamada
    const handleRemoveItem = jest.fn()

    //crea un component jest para el componente List
    const component = renderer.create(
      <List list={list} onRemoveItem={handleRemoveItem} />
    );
    //Dado que hay mas de un item dentro del cual cada item tiene el atributo 'a'
    //se debe usar findAllByType
    //se espera que el primer elemento a tenga su url igual a list[0].url
    //y el segunfo sea igaul a list[1].url
    expect(component.root.findAllByType('a')[0].props.href).toEqual('https://reactjs.org/')
    expect(component.root.findAllByType('a')[1].props.href).toEqual('https://redux.js.org/')
    //encuentra de ese componente el elemento react que sea boton y llama 2 veces
    //a la funcion que se encuentra en el componente List
    component.root.findAllByType('button')[0].props.onClick();
    component.root.findAllByType('button')[1].props.onClick();

    //haz el test que espera que la funcion haya sido llamada 2 vez
    expect(handleRemoveItem).toHaveBeenCalledTimes(2);

    //se espera que la cantidad de Item que se mapean en el componente
    //List sean los mismos que la variable list
    expect(component.root.findAllByType(Item).length).toEqual(2)
  })
})

describe('SearchForm', () =>{
  const searchFormProps = {
    searchTerm: 'React',
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn(),
  }

  let component;
  // the beforeEach() is run before each test in a describe
  beforeEach(() => {
    component = renderer.create(<SearchForm {...searchFormProps} />);
  })

  //como lo dice la descripcion, este test renderizara el campo de entrada
  //con su valor
  it('renders the input field with its value', () => {
    //declara una variable la cual buscara el typo de elemento (componente en este
    //caso) y encontrar su valor por medio de sus propiedades (que serian los
    //atributos HTML)
    const value = component.root.findByType('input' || InputWithLabel).props.value;

    //se espera que el valor que encuentre en la prop value sea igual a 'React'
    expect(value).toEqual('React');
  })

  it('changes the input field', () => {
    //crea un pseudo evento
    const pseudoEvent = { target: 'Redux' };

    //encuentra por el tipo de elemento input y llama a la funchon con la
    //prop onChange
    component
          .root
          .findByType('input'/*InputWithLabel*/)//dependiendo del elemento que se
          //elija
          .props.onChange/*onInputChange*/(pseudoEvent);//se va a usar la prop
          //que le corresponda

    //se espera que la funcion onsearchinput sea llamada una vez ya que el
    //las props de searchform solo es un objeto y no un arreglo de objetos
    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
    //se espera que la misma funcion haya sido llamada con el pseudo evento
    //pseudoEvent
    expect(searchFormProps.onSearchInput).toHaveBeenCalledWith(pseudoEvent);
  })

  it('submit the form', () => {
    //crea un pseudo evento
    const pseudoEvent = {};

    //llama a la funcion que se encuentra en la prop onSubmit dentro del elemento
    //'form'
    component.root.findByType('form').props.onSubmit(pseudoEvent);

    //se espera que la funcion que fue invocada haya sido llamada
    //1 vez y 
    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
    //tambien se espera que haya sido invocada con el argumento pseudoEvent
    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledWith(pseudoEvent);
  })
  it('check if the button is disbled', () => {
    //se espera que el elemento encontrado ('button') no este deshabilitado
    expect(component.root.findByType('button').props.disabled).toEqual(false)
  })
})