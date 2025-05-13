import { useEffect, useState } from "react";
import api from "../services/api";

export default function Reserve() {
	const usuario = JSON.parse(localStorage.getItem("usuario"));
	const [usuario_id] = useState(usuario?.id || "");
	const [vaga_id, setVagaId] = useState("");
	const [data, setData] = useState("");
	const [inicio, setInicio] = useState("");
	const [vagas, setVagas] = useState([]);

	// Carrega as vagas disponíveis ao carregar o componente
	useEffect(() => {
		const fetchVagas = async () => {
			try {
				const response = await api.get("/vagas");
				setVagas(response.data);
			} catch (error) {
				console.error("Erro ao carregar vagas:", error);
				setVagas([]);
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
			});
			alert(response.data.mensagem);
		} catch (error) {
			alert(error.response?.data?.erro || "Erro ao reservar a vaga");
		}
	};

	return (
		<form
			onSubmit={handleReserva}
			className="container mt-5"
			style={{ maxWidth: "500px" }}
		>
			<h2 className="mb-4 text-center">Reservar Vaga</h2>

			<div className="mb-3">
				<select
					className="form-select"
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
			</div>

			<div className="mb-3">
				<input
					type="date"
					value={data}
					onChange={(e) => setData(e.target.value)}
					className="form-control"
					required
				/>
			</div>

			<div className="mb-3">
				<input
					type="time"
					value={inicio}
					onChange={(e) => setInicio(e.target.value)}
					className="form-control"
					required
				/>
			</div>

			<button type="submit" className="btn btn-success w-100">
				Confirmar Reserva
			</button>
		</form>
	);
}
