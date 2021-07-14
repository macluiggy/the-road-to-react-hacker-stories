import React, { useState, useEffect, useCallback } from 'react';
import './estilos.css';

const UseCallback = () => {
	const [contador1, cambiarContador1] = useState(1);
	const [contador2, cambiarContador2] = useState(1);
	const [contador3, cambiarContador3] = useState(1);

	const aumentar1 = useCallback(() => {
		cambiarContador1(contador1 + 1);
	}, [contador1]);

	const aumentar2 = useCallback(() => {
		cambiarContador2(contador2 + 1);
	}, [contador2]);

	const aumentar3 = useCallback(() => {
		cambiarContador3(contador3 + 1);
	}, [contador3]);

	useEffect(() => {
		console.log('useEffect renderizado')
	}, [aumentar1, aumentar2, aumentar3])
	return (
		<div className="grid">
			<Encabezado />
			<ComponenteHijo texto="Contador 1" cuenta={contador1} sumarUno={aumentar1} />
			<ComponenteHijo texto="Contador 2" cuenta={contador2} sumarUno={aumentar2} />
			<ComponenteHijo texto="Contador 3" cuenta={contador3} sumarUno={aumentar3} />
		</div>
	);
}

const Encabezado = React.memo(() => {
	console.log(`Encabezado renderizado`)
	return (
		<div className="encabezado">
			<h1>Contadores</h1>
		</div>
	);
})

const ComponenteHijo = memo(({texto, cuenta, sumarUno}) => {
	console.log(`${texto} renderizado`)
	return (
		<div className="caja">
			<p>{texto}</p>
			<h1>{cuenta}</h1>
			<button className="boton" onClick={sumarUno}>+1</button>
		</div>
	);
})

export default UseCallback