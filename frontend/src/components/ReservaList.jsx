/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import useAutoLogout from "../utils/UseAutoLogout";

export default function ReservaList() {
	useAutoLogout();
	const [reservas, setReservas] = useState([]);
	const [filtro, setFiltro] = useState("todas");
	const [reservaSelecionada, setReservaSelecionada] = useState(null);
	const [acao, setAcao] = useState("");
	const [modalConfirmarAberto, setModalConfirmarAberto] = useState(false);
	const [loadingModal, setLoadingModal] = useState(false);

	const usuario = JSON.parse(sessionStorage.getItem("usuario"));

	const carregarReservas = async () => {
		try {
			const response = await api.get("/reservas");
			const minhas = response.data.filter(
				(r) => Number(r.usuario_id) === Number(usuario.id)
			);
			setReservas(minhas);
		} catch (error) {
			toast.error("Erro ao carregar reservas", error);
		}
	};

	useEffect(() => {
		carregarReservas();
	}, []);

	const prioridadeStatus = { confirmada: 0, pendente: 1, cancelada: 2 };

	const filtradas = reservas
		.filter((r) => filtro === "todas" || r.status === filtro)
		.sort((a, b) => {
			const pA = prioridadeStatus[a.status] ?? 3;
			const pB = prioridadeStatus[b.status] ?? 3;
			if (pA !== pB) return pA - pB;
			return new Date(a.data) - new Date(b.data);
		});

	const abrirModalDetalhes = (reserva) => {
		setReservaSelecionada(reserva);
	};

	const abrirModalConfirmar = (acaoSelecionada) => {
		setAcao(acaoSelecionada);
		setModalConfirmarAberto(true);
	};

	const fecharTodosModais = () => {
		setReservaSelecionada(null);
		setAcao("");
		setModalConfirmarAberto(false);
		setLoadingModal(false);
	};

	const confirmarAcao = async () => {
		if (!reservaSelecionada || !acao) return;
		setLoadingModal(true);

		try {
			await api.put(`/reservas/${acao}/${reservaSelecionada.reserva_id}`);
			toast.success(`Reserva ${acao} com sucesso!`);
		} catch (error) {
			toast.error("Erro ao realizar a ação.", error);
		} finally {
			setLoadingModal(false);
			fecharTodosModais();
			carregarReservas();
		}
	};

	const mostrarAvisoMulta = () => {
		const agora = new Date();
		const [ano, mes, dia] = reservaSelecionada.data.split("-");
		const [hora, minuto] = reservaSelecionada.horario_inicio.split(":");
		const dataHoraReserva = new Date(ano, mes - 1, dia, hora, minuto);
		const diferencaMinutos = (dataHoraReserva - agora) / (1000 * 60);
		return diferencaMinutos > 0 && diferencaMinutos <= 60;
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
				<div className="container">
					{filtradas.map((r) => (
						<div
							className="card p-3 d-flex flex-row align-items-center justify-content-between mb-3 shadow-sm"
							key={r.reserva_id}
						>
							<div className="text-center">
								<h6>Vaga</h6>
								<p>{r.vaga}</p>
							</div>
							<div className="text-center">
								<h6>Data</h6>
								<p>{r.data}</p>
							</div>
							<div className="text-center">
								<h6>Início</h6>
								<p>{r.horario_inicio}</p>
							</div>
							<div className="text-center">
								<h6>Status</h6>
								<p>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</p>
							</div>
							<button
								className="btn btn-outline-primary"
								onClick={() => abrirModalDetalhes(r)}
							>
								Ver mais
							</button>
						</div>
					))}
				</div>
			)}

			{/* Modal de Detalhes */}
			{reservaSelecionada && !modalConfirmarAberto && (
				<div className="modal fade show d-block" tabIndex="-1" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Detalhes da Reserva</h5>
								<button
									type="button"
									className="btn-close"
									onClick={fecharTodosModais}
								></button>
							</div>
							<div className="modal-body">
								<p>
									<strong>Vaga:</strong> {reservaSelecionada.vaga}
									<br />
									<strong>Data:</strong> {reservaSelecionada.data}
									<br />
									<strong>Início:</strong> {reservaSelecionada.horario_inicio}
									<br />
									<strong>Status:</strong>{" "}
									{reservaSelecionada.status.charAt(0).toUpperCase() +
										reservaSelecionada.status.slice(1)}
								</p>
							</div>
							<div className="modal-footer">
								{reservaSelecionada.status === "pendente" && (
									<>
										<button
											className="btn btn-success"
											onClick={() => abrirModalConfirmar("confirmar")}
										>
											Confirmar
										</button>
										<button
											className="btn btn-danger"
											onClick={() => abrirModalConfirmar("cancelar")}
										>
											Cancelar
										</button>
									</>
								)}
								{reservaSelecionada.status === "confirmada" && (
									<button
										className="btn btn-warning"
										onClick={() => abrirModalConfirmar("encerrar")}
									>
										Encerrar
									</button>
								)}
								<button
									className="btn btn-secondary"
									onClick={fecharTodosModais}
								>
									Fechar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Modal de Confirmação */}
			{modalConfirmarAberto && (
				<div className="modal fade show d-block" tabIndex="-1" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">
									{acao.charAt(0).toUpperCase() + acao.slice(1)} Reserva
								</h5>
								<button
									type="button"
									className="btn-close"
									onClick={fecharTodosModais}
								></button>
							</div>
							<div className="modal-body">
								<p>
									Tem certeza que deseja <strong>{acao}</strong> a reserva da
									vaga <strong>{reservaSelecionada.vaga}</strong> no dia{" "}
									<strong>{reservaSelecionada.data}</strong> às{" "}
									<strong>{reservaSelecionada.horario_inicio}</strong>?
								</p>

								{acao === "cancelar" && mostrarAvisoMulta() && (
									<div className="alert alert-warning mt-3">
										Atenção: Faltam menos de 1 hora para o início da reserva.
										Será cobrada uma multa de R$5,00.
									</div>
								)}
							</div>
							<div className="modal-footer">
								<button
									className="btn btn-secondary"
									onClick={fecharTodosModais}
								>
									Fechar
								</button>
								<button
									className="btn btn-primary"
									onClick={confirmarAcao}
									disabled={loadingModal}
								>
									{loadingModal ? "Processando..." : `Sim, ${acao}`}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
