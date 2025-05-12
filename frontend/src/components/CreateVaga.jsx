import { useState } from "react";
import api from "../services/api";

export default function CreateVaga() {
	const [identificador, setIdentificador] = useState("");
	const [descricao, setDescricao] = useState("");
	const [status, setStatus] = useState("livre");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await api.post("/vagas", { identificador, descricao, status });
			alert("Vaga cadastrada com sucesso!");
			setIdentificador("");
			setDescricao("");
			setStatus("livre");
		} catch (error) {
			alert(error.response?.data?.erro || "Erro ao cadastrar vaga");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Cadastrar Vaga</h2>

			<input
				type="text"
				placeholder="Identificador"
				value={identificador}
				onChange={(e) => setIdentificador(e.target.value)}
				required
			/>

			<select
				value={descricao}
				onChange={(e) => setDescricao(e.target.value)}
				required
			>
				<option value="">Selecione o tipo de vaga</option>
				<option value="Vaga coberta">Vaga coberta</option>
				<option value="Vaga descoberta">Vaga descoberta</option>
			</select>

			<select value={status} onChange={(e) => setStatus(e.target.value)}>
				<option value="livre">Livre</option>
				<option value="ocupada">Ocupada</option>
			</select>

			<button type="submit">Cadastrar</button>
		</form>
	);
}
