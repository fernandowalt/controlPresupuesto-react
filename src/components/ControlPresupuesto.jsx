/** @format */

import { useEffect, useState } from "react";

import "react-circular-progressbar/dist/styles.css";

// Import react-circular-progressbar module and styles
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export const ControlPresupuesto = ({ gastos, presupuesto, setGastos, setPresupuesto, setIsValidPre }) => {
	const [disponible, setDisponible] = useState(0);
	const [gastado, setGastado] = useState(0);

	const porcentaje = Math.round((gastado / presupuesto) * 100);
	useEffect(() => {
		const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
		const totalDisponible = presupuesto - totalGastado;

		setGastado(totalGastado);
		setDisponible(totalDisponible);
	}, [gastos]);

	const formatearCantidad = cantidad => {
		return cantidad.toLocaleString("es-CO", {
			style: "currency",
			currency: "COP",
		});
	};

	const handleResetApp = () => {
		const resultado = confirm("¿deseas resetear el presupuesto y los gastos gastos?");

		if (resultado) {
			setGastos([]);
			setPresupuesto(0);
			setIsValidPre(false);
			localStorage.clear()
		}
	};

	return (
		<div className="contenedor-presupuesto contenedor sombra dos-columnas">
			<div>
				<CircularProgressbar
					strokeWidth={5}
					text={`${porcentaje}% Gastado`}
					value={porcentaje}
					styles={buildStyles({
						pathColor: porcentaje > 100 ? "#dc2626" : "#3b82f6",
						trailColor: "#d6d0d0",
						textColor: porcentaje > 100 ? "#dc2626" : "#3b82f6",
						pathTransitionDuration: 2,
					})}
				/>
			</div>
			<div className="contenido-presupuesto">
				<button className="reset-app" type="button" onClick={handleResetApp}>
					Resetear App
				</button>

				<p>
					<span>Presupuesto:</span>
					{formatearCantidad(presupuesto)}
				</p>
				<p className={`${disponible <= 0 ? "negativo" : ""}`}>
					<span>Disponible:</span>
					{formatearCantidad(disponible)}
				</p>
				<p>
					<span>Gastado:</span>
					{formatearCantidad(gastado)}
				</p>
			</div>
		</div>
	);
};
