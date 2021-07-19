import { Component, useEffect, useState } from 'react';

class HookMigration extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      value: localStorage.getItem('myValueInLocalStorage') || '',
    };
  }

  componentDidUpdate() {
    localStorage.setItem('myValueInLocalStorage', this.state.value)
  }
  onChange = event => {
    this.setState({ value: event.target.value });
  };
 
  render() {
    return (
      <div>
        <h1>Hello React ES6 Class Component!</h1>
 
        <input
          value={this.state.value}
          type="text"
          onChange={this.onChange}
        />
 
        <p>{this.state.value}</p>
      </div>
    );
  }
}


//FUNCTION COMPONENT
const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || ''
    )

  useEffect(() => {
    localStorage.setItem(localStorageKey, value)
  }, [value])

  return [value, setValue];
}
const HookMigration0 = () => {
  const [value, setValue] = useStateWithLocalStorage('myValueInLocalStorage')

  const onChange = e => setValue(e.target.value)
  return (
    <div>
      <h1>Hello React Function Component!</h1>
 
      <input value={value} type="text" onChange={onChange} />
 
      <p>{value}</p>
    </div>
  );
};

export default HookMigration