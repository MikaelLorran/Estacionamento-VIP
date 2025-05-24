import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import useAutoLogout from "../utils/UseAutoLogout";

export default function Faturas() {
	useAutoLogout();
	const [faturas, setFaturas] = useState([]);
	const [filtro, setFiltro] = useState("todas");
	const [modalAberto, setModalAberto] = useState(false);
	const [faturaSelecionada, setFaturaSelecionada] = useState(null);

	const carregarFaturas = async () => {
		try {
			const response = await api.get("/faturas");
			console.log("Dados recebidos:", response.data);

			if (Array.isArray(response.data)) {
				setFaturas(response.data);
			} else {
				console.error("Resposta inesperada da API:", response.data);
				setFaturas([]);
			}
		} catch (error) {
			console.error("Erro ao carregar faturas:", error);
			toast.error("Erro ao carregar faturas.");
			setFaturas([]);
		}
	};

	useEffect(() => {
		carregarFaturas();
	}, []);

	const abrirModal = (fatura) => {
		setFaturaSelecionada(fatura);
		setModalAberto(true);
	};

	const fecharModal = () => {
		setFaturaSelecionada(null);
		setModalAberto(false);
	};

	const pagarFatura = async () => {
		try {
			await api.put(`/faturas/pagar/${faturaSelecionada.id}`);
			toast.success("Fatura paga com sucesso!");
			fecharModal();
			carregarFaturas();
		} catch (error) {
			toast.error("Erro ao pagar fatura.", error);
		}
	};

	const faturasFiltradas =
		filtro === "todas"
			? faturas
			: faturas.filter((f) => f.status.toLowerCase() === filtro);

	const totalPendente = faturas
		.filter((f) => f.status.toLowerCase() === "pendente")
		.reduce((acc, f) => acc + (parseFloat(f.valor) || 0), 0);

	return (
		<div className="container mt-5">
			<div className="card p-3 d-flex flex-row align-items-center justify-content-between mb-4 shadow-sm">
				<div>
					<h5 className="mb-0">Total de faturas pendentes:</h5>
					<h3 className="text-success mb-0">
						R$ {(parseFloat(totalPendente) || 0).toFixed(2).replace(".", ",")}
					</h3>
				</div>
				<button
					className="btn btn-primary"
					onClick={async () => {
						const pendentes = faturas.filter(
							(f) => f.status.toLowerCase() === "pendente"
						);

						if (pendentes.length === 0) {
							toast.info("Nenhuma fatura pendente para pagar.");
							return;
						}

						for (const f of pendentes) {
							await api.put(`/faturas/pagar/${f.id}`);
						}

						toast.success("Todas as faturas foram pagas com sucesso!");
						carregarFaturas();
					}}
				>
					Pagar todas
				</button>
			</div>

			<h2 className="mb-4">Minhas Faturas</h2>

			<div className="mb-3">
				<label className="form-label">Filtrar por status:</label>
				<select
					className="form-select w-auto"
					value={filtro}
					onChange={(e) => setFiltro(e.target.value)}
				>
					<option value="todas">Todas</option>
					<option value="pendente">Pendentes</option>
					<option value="pago">Pagas</option>
				</select>
			</div>

			{faturasFiltradas.length === 0 ? (
				<p>Nenhuma fatura encontrada.</p>
			) : (
				<div className="container">
					{faturasFiltradas.map((fatura) => (
						<div
							className="card p-3 d-flex flex-row align-items-center justify-content-between mb-2 shadow-sm"
							key={fatura.id}
						>
							<div className="text-center">
								<h6>ID Fatura</h6>
								<p>{fatura.id}</p>
							</div>
							<div className="text-center">
								<h6>Data</h6>
								<p>{fatura.data_confirmacao}</p>
							</div>
							<div className="text-center">
								<h6>Status</h6>
								<p>
									{fatura.status.charAt(0).toUpperCase() +
										fatura.status.slice(1)}
								</p>
							</div>
							<div className="text-center">
								<h6>Valor (R$)</h6>
								<p>
									{parseFloat(fatura.valor || 0)
										.toFixed(2)
										.replace(".", ",")}
								</p>
							</div>
							<button
								className="btn btn-primary"
								onClick={() => abrirModal(fatura)}
							>
								Ver mais...
							</button>
						</div>
					))}
				</div>
			)}

			{modalAberto && faturaSelecionada && (
				<div className="modal fade show d-block" tabIndex="-1" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">
									Detalhes da Fatura #{faturaSelecionada.id}
								</h5>
								<button
									type="button"
									className="btn-close"
									onClick={fecharModal}
								></button>
							</div>
							<div className="modal-body">
								<p>
									<strong>Vaga:</strong> {faturaSelecionada.vaga}
								</p>
								<p>
									<strong>Data:</strong> {faturaSelecionada.data_confirmacao}
								</p>
								<p>
									<strong>Início:</strong> {faturaSelecionada.horario_inicio}
								</p>
								<p>
									<strong>Saída:</strong> {faturaSelecionada.horario_saida}
								</p>
								<p>
									<strong>Duração:</strong> {faturaSelecionada.duracao}
								</p>
								<p>
									<strong>Status:</strong> {faturaSelecionada.status}
								</p>
								<p>
									<strong>Valor:</strong> R${" "}
									{parseFloat(faturaSelecionada.valor || 0)
										.toFixed(2)
										.replace(".", ",")}
								</p>
							</div>
							<div className="modal-footer">
								<button className="btn btn-secondary" onClick={fecharModal}>
									Fechar
								</button>
								{faturaSelecionada.status.toLowerCase() === "pendente" && (
									<button className="btn btn-success" onClick={pagarFatura}>
										Pagar fatura
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
