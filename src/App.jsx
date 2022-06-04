/** @format */

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ListadoGastos } from "./components/ListadoGastos";
import { ModalNuevoGasto } from "./components/ModalNuevoGasto";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import { generarId } from "./helpers";
import { Filtros } from "./components/Filtros";

function App() {
	const [presupuesto, setPresupuesto] = useState(localStorage.getItem("presupuesto") ?? 0);
	const [isValidPre, setIsValidPre] = useState(false);
	const [modal, setModal] = useState(false);
	const [animarModal, setAnimarModal] = useState(false);
	const [gastos, setGastos] = useState(localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []);
	const [gastoEditar, setGastoEditar] = useState({});
	const [filtro, setFiltro] = useState([]);
	const [gastosFiltrados, setGastosFiltrados] = useState([]);

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setModal(true);

			setTimeout(() => {
				setAnimarModal(true);
			}, 500);
		}
	}, [gastoEditar]);

	useEffect(() => {
		Number(localStorage.setItem("presupuesto", presupuesto ?? 0));
	}, [presupuesto]);

	useEffect(() => {
		const presupuestoLocalStorage = Number(localStorage.getItem("presupuesto")) ?? 0;

		if (presupuestoLocalStorage > 0) {
			setIsValidPre(true);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
	}, [gastos]);

	useEffect(() => {
		const gastosLocalStorage = JSON.parse(localStorage.getItem("gastos"));

		if (gastosLocalStorage) {
			setGastos(gastosLocalStorage);
		}
	}, []);

	useEffect(() => {
		if (filtro.length > 0) {
			const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
			setGastosFiltrados(gastosFiltrados);
		}
	}, [filtro]);

	const handleNuevoGasto = () => {
		setModal(true);
		setGastoEditar({});

		setTimeout(() => {
			setAnimarModal(true);
		}, 500);
	};
	const guardarGasto = gasto => {
		const now = new Date();

		if (gasto.id) {
			const gastosActualizados = gastos.map(gastoState => (gastoState.id === gasto.id ? gasto : gastoState));

			console.log(gastosActualizados);

			setGastos(gastosActualizados);
			setGastoEditar({});
		} else {
			gasto.id = generarId();
			gasto.fecha = now;
			setGastos([...gastos, gasto]);
		}

		setAnimarModal(false);
		setTimeout(() => {
			setModal(false);
		}, 500);
	};
	const eliminarGasto = id => {
		const nuevosGastos = gastos.filter(gasto => (gasto.id === id ? null : gasto));

		setGastos(nuevosGastos);
	};

	return (
		<div className={modal ? "fijar" : ""}>
			<Header gastos={gastos} setGastos={setGastos} presupuesto={presupuesto} setPresupuesto={setPresupuesto} isValidPre={isValidPre} setIsValidPre={setIsValidPre} />

			{isValidPre && (
				<>
					<main>
						<Filtros filtro={filtro} setFiltro={setFiltro} />
						<ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} gastosFiltrados={gastosFiltrados} filtro={filtro} />
					</main>
					<div className="nuevo-gasto">
						<img src={IconoNuevoGasto} alt="icono-nuevo-gasto" onClick={handleNuevoGasto} />
					</div>
				</>
			)}

			{modal && (
				<ModalNuevoGasto
					setModal={setModal}
					animarModal={animarModal}
					setAnimarModal={setAnimarModal}
					guardarGasto={guardarGasto}
					gastoEditar={gastoEditar}
					setGastoEditar={setGastoEditar}
				/>
			)}
		</div>
	);
}

export default App;
