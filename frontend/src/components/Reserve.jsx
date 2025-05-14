import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Reserve() {
	const usuario = JSON.parse(localStorage.getItem("usuario"));
	const [usuario_id] = useState(usuario?.id || "");
	const [vaga_id, setVagaId] = useState("");
	const [data, setData] = useState("");
	const [inicio, setInicio] = useState("");
	const [vagas, setVagas] = useState([]);
	const [minhasReservas, setMinhasReservas] = useState([]);
	const [loading, setLoading] = useState(false);
	const [bloqueado, setBloqueado] = useState(false);

	useEffect(() => {
		const fetchVagas = async () => {
			try {
				const response = await api.get("/vagas");
				setVagas(response.data);
			} catch (error) {
				console.error("Erro ao carregar vagas:", error);
			}
		};

		const fetchReservas = async () => {
			try {
				const response = await api.get("/reservas");
				const minhas = response.data.filter(
					(r) => Number(r.usuario_id) === Number(usuario.id)
				);
				setMinhasReservas(minhas);
			} catch (error) {
				console.error("Erro ao carregar reservas:", error);
			}
		};

		fetchVagas();
		fetchReservas();
	}, [usuario.id]);

	const handleReserva = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await api.post("/reservar", {
				usuario_id,
				vaga_id,
				data,
				inicio,
			});
			toast.success(response.data.mensagem);
			setBloqueado(true);
			setTimeout(() => {
				window.location.reload();
			}, 1500);
		} catch (error) {
			toast.error("Erro ao reservar a vaga", error);
		} finally {
			setLoading(false);
		}
	};

	const reservaDuplicada = minhasReservas.some(
		(r) => r.data === data && r.horario_inicio === inicio
	);

	const isBotaoDesativado = loading || reservaDuplicada || bloqueado;

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

			<button
				type="submit"
				className="btn btn-success w-100"
				disabled={isBotaoDesativado}
			>
				{reservaDuplicada
					? "Já reservado para esse horário"
					: bloqueado
					? "Reserva realizada - Aguarde..."
					: loading
					? "Aguarde..."
					: "Confirmar Reserva"}
			</button>
		</form>
	);
}
