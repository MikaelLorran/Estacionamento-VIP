import { useEffect, useState } from "react";
import api from "../services/api";

export default function ReservaList() {
	const [reservas, setReservas] = useState([]);
	const [filtro, setFiltro] = useState("todas");
	const [reservaSelecionada, setReservaSelecionada] = useState(null);
	const [acao, setAcao] = useState("");

	const usuario = JSON.parse(localStorage.getItem("usuario"));

	const carregarReservas = async () => {
		try {
			const response = await api.get("/reservas");
			const minhas = response.data.filter(
				(r) => Number(r.usuario_id) === Number(usuario.id)
			);
			setReservas(minhas);
		} catch (error) {
			console.error("Erro ao carregar reservas", error);
		}
	};

	useEffect(() => {
		carregarReservas();
	}, []);

	const filtradas = reservas.filter((r) =>
		filtro === "todas" ? true : r.status === filtro
	);

	const abrirModal = (reserva, acao) => {
		setReservaSelecionada(reserva);
		setAcao(acao);
	};

	const fecharModal = () => {
		setReservaSelecionada(null);
		setAcao("");
	};

	const confirmarAcao = async () => {
		if (!reservaSelecionada) return;

		try {
			if (acao === "confirmar") {
				await api.put(`/reservas/confirmar/${reservaSelecionada.id}`);
			} else if (acao === "cancelar") {
				await api.put(`/reservas/cancelar/${reservaSelecionada.id}`);
			} else if (acao === "encerrar") {
				await api.put(`/reservas/encerrar/${reservaSelecionada.id}`);
			}

			fecharModal();
			carregarReservas();
		} catch (error) {
			alert("Erro ao realizar a ação", error);
		}
	};

	return (
		<div className="container mt-5">
			<h2 className="mb-4">Minhas Reservas</h2>

			<div className="mb-3">
				<label className="form-label">Filtrar por status:</label>
				<select
					className="form-select w-auto"
					value={filtro}
					onChange={(e) => setFiltro(e.target.value)}
				>
					<option value="todas">Todas</option>
					<option value="pendente">Pendentes</option>
					<option value="confirmada">Confirmadas</option>
					<option value="cancelada">Canceladas</option>
				</select>
			</div>

			{filtradas.length === 0 ? (
				<p>Nenhuma reserva encontrada.</p>
			) : (
				<table className="table table-striped">
					<thead>
						<tr>
							<th>ID</th>
							<th>Vaga</th>
							<th>Data</th>
							<th>Início</th>
							<th>Status</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{filtradas.map((r) => (
							<tr key={r.id}>
								<td>{r.id}</td>
								<td>{r.vaga}</td>
								<td>{r.data}</td>
								<td>{r.horario_inicio}</td>
								<td>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</td>
								<td>
									{r.status === "pendente" && (
										<>
											<button
												className="btn btn-sm btn-success me-2"
												onClick={() => abrirModal(r, "confirmar")}
											>
												Confirmar
											</button>
											<button
												className="btn btn-sm btn-danger me-2"
												onClick={() => abrirModal(r, "cancelar")}
											>
												Cancelar
											</button>
										</>
									)}
									{r.status === "confirmada" && (
										<button
											className="btn btn-sm btn-warning"
											onClick={() => abrirModal(r, "encerrar")}
										>
											Encerrar
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			{/* Modal */}
			{reservaSelecionada && (
				<div className="modal fade show d-block" tabIndex="-1" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">
									{acao === "confirmar"
										? "Confirmar Reserva"
										: acao === "cancelar"
										? "Cancelar Reserva"
										: "Encerrar Reserva"}
								</h5>

								<button
									type="button"
									className="btn-close"
									onClick={fecharModal}
								></button>
							</div>
							<div className="modal-body">
								<p>
									Você tem certeza que deseja{" "}
									<strong>
										{acao === "confirmar"
											? "confirmar"
											: acao === "cancelar"
											? "cancelar"
											: "encerrar"}
									</strong>{" "}
									a reserva da vaga <strong>{reservaSelecionada.vaga}</strong>{" "}
									no dia <strong>{reservaSelecionada.data}</strong> às{" "}
									<strong>{reservaSelecionada.horario_inicio}</strong>?
								</p>
							</div>
							<div className="modal-footer">
								<button className="btn btn-secondary" onClick={fecharModal}>
									Fechar
								</button>
								<button className="btn btn-primary" onClick={confirmarAcao}>
									Sim, {acao}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
