import React from 'react';
import renderer from 'react-test-renderer';

import SearchForm from './index.tsx';

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
    const pseudoEvent = { target: { value: 'Redux' } };

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

  it('disables the button and prevents submit', () => {
    /*component =  renderer.create(
      <SearchForm {...searchFormProps} searchTerm='' />
    )*/
    //lo de arriba seria lo habitual, pero usando el metodo update() nos permite
    //simplemente actualizar el componente con nuevas props, de esta forma no tendremos
    // que redefinir el componente, solo actualizarlo
    component.update(
      <SearchForm {...searchFormProps} searchTerm='' />
    )

    //una vez actualizado se busca el tipo de elemento button y se espera que
    //su valor sea truthy ya que el valor de searchTerm es un string vacio
    //lo que en el componente sera igal a true debido a que en el componente esta
    //definido como !searchTerm
    expect(
      component.root.findByType('button').props.disabled
    ).toBeTruthy();
  })

  test('renders snapshot for SearchForm Component', () => {
    let arból = component.toJSON();
    expect(arból).toMatchSnapshot()
  })
})