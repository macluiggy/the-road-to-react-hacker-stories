import renderer from 'react-test-renderer';

import InputWithLabel from './index';

describe('InputWithLabel', () => {
	let onSearchInput = jest.fn()
	let component = renderer.create(<InputWithLabel
		id='hola'
		value='compa'
		onInputChange={onSearchInput}
		isFocused={false} />)

	it('renders all propertiesxxx', () => {
		expect(component.root.findByType('label').props.htmlFor).toEqual('hola')
	})
})