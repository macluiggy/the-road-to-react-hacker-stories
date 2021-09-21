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
import axios from 'axios';

//import { SearchForm, InputWithLabel, List, Item } from './App.tsx';
import App from './App.tsx';
import List from './List/'

/*describe('Something truthy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => expect(false).toBe(false));
})*/



//esto simula la libreria axios en jest
jest.mock('axios');

describe('App', () => {

  it('succeeds fetching data with list', async () => {
    //crea una lista que sera los datos a traer
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
    ];
    //crea una promesa con el array que se va a devolver
    const promise = Promise.resolve({
      data: {
        hits: list,
      },
    });
    //esto hace que se simule el metofo get() de axios ya que la data que se
    //prevee no se puede ver en el test
    axios.get.mockImplementationOnce(() => promise);

    let component;
    //dado que estamos usando axios para traer datos asincronos, al definir el
    //componente App debemos hacerlos de manera asincrona, ya que dentro de App
    //tambien se renderiza el componente List el cual es el que contiene los datos
    //asincronos
    await renderer.act(async () => {
      component = renderer.create(<App />);
    });

    //una vez se obtengan los datos realizamos el test, el cual dice que
    //se espera que al encontrar el tipo List (el componente con los datos
    //asincronos) sus prop list sea igual a list
    expect(component.root.findByType(List).props.list).toEqual(list);
  });

  it('fails  fetching data with a list', async () => {
    //crea la promesa
    const promise = Promise.reject();

    //simula la llamada a la API
    axios.get.mockImplementationOnce(() => promise);

    //define el componente
    let component;

    //esa await y async dado que el componente hijo List recibe los datos
    //asincronos
    await renderer.act(async () => {
      component = renderer.create(<App />);
    })

    //una vez se haya heco la peticion, testea que el tipo de elemento 'p',
    //el cual es el que tiene el mensaje de error, su prop children sea igual al
    //mensaje que del test
    expect(component.root.findByType('p').props.children)
          .toEqual('Something went wrong...')
  })

  test('renders snapshot for App component', () => {
    let hola = renderer.create(<App />).toJSON();
    expect(hola).toMatchSnapshot()
  })
})

/*describe('App', () => {
  it('succeeds fetching data with a list', async () => {
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
    ];

    const promise = Promise.resolve({
      data: {
        hits: list,
      },
    });

    axios.get.mockImplementationOnce(() => promise);

    let component;

    await renderer.act(async () => {
      component = renderer.create(<App />);
    });

    expect(component.root.findByType(List).props.list).toEqual(list);
  });
});
*/