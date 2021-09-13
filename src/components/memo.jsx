import { memo, useState, useCallback } from 'react';

const Memo = () => {
	const [state, setState] = useState(false)
	const toggleOn = useCallback(() => setState(!state), [state])
	return (
		<div>
			<ChildrenMemo state={state} toggleOn={toggleOn}/>
		</div>
	)
}

const ChildrenMemo = memo(({state, toggleOn}) => {
	console.log('ChildrenMemo rendered')
	return (
		<div>
			<button
			style={{
				backgroundColor: state ? 'blue' : 'gray' 
			}}
			onClick={toggleOn} >{state ? 'On' : 'Of'}</button>
		</div>
	)
})
export default Memo