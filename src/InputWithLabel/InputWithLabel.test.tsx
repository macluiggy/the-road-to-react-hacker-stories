import renderer from 'react-test-renderer';

import InputWithLabel from './index';

describe('InputWithLabel', () => {
	let onSearchInput = jest.fn()
	const pseudoEvent = { target: { value: 'Redux' } };
	let component = renderer.create(<InputWithLabel
		id='hola'
		value='compa'
		onInputChange={onSearchInput}
		isFocused={false}
		children='Search:' />)

	it('renders all properties', () => {
		expect(component.root.findByType('label').props.htmlFor).toEqual('hola')
		expect(component.root.findByType('input').props.type).toEqual('text')

		component.root.findByType('input').props.onChange(pseudoEvent)
		expect(onSearchInput).toHaveBeenCalledTimes(1)
		expect(onSearchInput).toHaveBeenCalledWith(pseudoEvent)

		expect(component.root.findByType('label').props.children).toEqual('Search:')
		expect(component.root.findByType('input').props.value).toBe('compa')
		expect(component.root.findByType('input').props.className).toEqual('joker')
	})
})