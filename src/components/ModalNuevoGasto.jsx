/** @format */

import React, { useState, useEffect } from "react";
import SvgCerrar from "../img/cerrar.svg";
import { Mensaje } from "./Mensaje";

export const ModalNuevoGasto = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {
	const [mensaje, setMensaje] = useState("");
	const [campos, setCampos] = useState({
		nombre: "",
		cantidad: "",
		categoria: "",
		id: "",
	});

	const { nombre, cantidad, categoria } = campos;

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setCampos(gastoEditar);
		}
	}, [gastoEditar]);

	const handleCloseModal = () => {
		setAnimarModal(false);
		setGastoEditar({});
		setTimeout(() => {
			setModal(false);
		}, 500);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (nombre === "" || cantidad <= 0 || categoria === "") {
			setMensaje("Todos los son requeridos ");

			setTimeout(() => {
				setMensaje("");
			}, 2000);

			return;
		}

		guardarGasto(campos);
	};

	return (
		<div className="modal">
			<div className="cerrar-modal">
				<img src={SvgCerrar} alt="cerrar-modal" onClick={handleCloseModal} />
			</div>

			<form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
				<legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
				{mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
				<div className="campo">
					<label htmlFor="nombre">Nombre Gasto</label>
					<input
						id="nombre"
						type="text"
						placeholder="Añade el nombre del gasto"
						value={nombre}
						onChange={e => setCampos({ ...campos, nombre: e.target.value })}
					/>
				</div>
				<div className="campo">
					<label htmlFor="cantidad">Cantidad</label>
					<input
						id="cantidad"
						type="number"
						placeholder="Añade la cantidad del gasto ej:250"
						value={cantidad}
						onChange={e => setCampos({ ...campos, cantidad: Number(e.target.value) })}
					/>
				</div>
				<div className="campo">
					<label htmlFor="categoria">Categoria</label>
					<select id="categoria" value={categoria} onChange={e => setCampos({ ...campos, categoria: e.target.value })}>
						<option value="">--Seleccione--</option>
						<option value="ahorro">Ahorro</option>
						<option value="comida">Comida</option>
						<option value="casa">Casa</option>
						<option value="gastos">Gastos Varios</option>
						<option value="ocio">Ocio</option>
						<option value="salud">Salud</option>
						<option value="suscripciones">Suscripciones</option>
					</select>
				</div>

				<input type="submit" value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"} />
			</form>
		</div>
	);
};
