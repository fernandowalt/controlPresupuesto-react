/** @format */

import React from "react";
import { NuevoPresupuesto } from "./NuevoPresupuesto";
import { ControlPresupuesto } from "./ControlPresupuesto";

export const Header = ({ gastos, setGastos, presupuesto, setPresupuesto, isValidPre, setIsValidPre }) => {
	return (
		<header>
			<h1>Planificador de gastos</h1>
			{isValidPre ? (
				<ControlPresupuesto gastos={gastos} setPresupuesto={setPresupuesto} presupuesto={presupuesto} setGastos={setGastos} setIsValidPre={setIsValidPre} />
			) : (
				<NuevoPresupuesto presupuesto={presupuesto} setPresupuesto={setPresupuesto} setIsValidPre={setIsValidPre} />
			)}
		</header>
	);
};
