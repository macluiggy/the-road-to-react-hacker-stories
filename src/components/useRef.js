import React, {useRef} from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
    console.log(!!inputEl.current, inputEl)
  };
  return (
    <>
      <input ref={inputEl} type="text" className="hola soy un input"/>
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

export default TextInputWithFocusButton;