import { useEffect, useState } from "react";
import api from "../services/api";

export default function Reserve() {
	const [usuario_id, setUsuarioId] = useState(""); // Ainda manual, idealmente vindo da sessão
	const [vaga_id, setVagaId] = useState("");
	const [data, setData] = useState("");
	const [inicio, setInicio] = useState("");
	const [fim, setFim] = useState("");
	const [vagas, setVagas] = useState([]);

	// Carrega as vagas disponíveis ao carregar o componente
	useEffect(() => {
		const fetchVagas = async () => {
			try {
				const response = await api.get("/vagas");
				setVagas(response.data);
			} catch (error) {
				console.error("Erro ao carregar vagas:", error);
			}
		};

		fetchVagas();
	}, []);

	const handleReserva = async (e) => {
		e.preventDefault();

		try {
			const response = await api.post("/reservar", {
				usuario_id,
				vaga_id,
				data,
				inicio,
				fim,
			});
			alert(response.data.mensagem);
		} catch (error) {
			alert(error.response?.data?.erro || "Erro ao reservar a vaga");
		}
	};

	return (
		<form onSubmit={handleReserva}>
			<h2>Reservar Vaga</h2>

			<input
				type="number"
				placeholder="ID do Usuário"
				value={usuario_id}
				onChange={(e) => setUsuarioId(e.target.value)}
				required
			/>

			<select
				value={vaga_id}
				onChange={(e) => setVagaId(e.target.value)}
				required
			>
				<option value="">Selecione uma vaga</option>
				{vagas.map((vaga) => (
					<option key={vaga.id} value={vaga.id}>
						{vaga.identificador} - {vaga.descricao}
					</option>
				))}
			</select>

			<input
				type="date"
				value={data}
				onChange={(e) => setData(e.target.value)}
				required
			/>

			<input
				type="time"
				value={inicio}
				onChange={(e) => setInicio(e.target.value)}
				required
			/>

			<input
				type="time"
				value={fim}
				onChange={(e) => setFim(e.target.value)}
				required
			/>

			<button type="submit">Reservar</button>
		</form>
	);
}
