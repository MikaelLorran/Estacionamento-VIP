import { useEffect, useState } from "react";
import api from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function GerenciarVagas() {
	const [vagas, setVagas] = useState([]);
	const [modalAberto, setModalAberto] = useState(false);
	const [vagaEditando, setVagaEditando] = useState(null);

	const carregarVagas = async () => {
		try {
			const response = await api.get("/vagas/gerenciar");
			setVagas(response.data);
		} catch (error) {
			console.error("Erro ao carregar vagas", error);
		}
	};

	useEffect(() => {
		carregarVagas();
	}, []);

	const excluirVaga = async (id) => {
		if (window.confirm("Tem certeza que deseja excluir esta vaga?")) {
			try {
				await api.delete(`/vagas/excluir/${id}`);
				alert("Vaga excluída com sucesso");
				carregarVagas(); // atualiza a lista
			} catch (error) {
				alert(error.response?.data?.erro || "Erro ao excluir");
			}
		}
	};

	return (
		<div className="container mt-5">
			<h2 className="mb-4">Gerenciar Vagas</h2>
			<table className="table table-bordered table-striped">
				<thead className="table-light">
					<tr>
						<th>ID</th>
						<th>Identificador</th>
						<th>Descrição</th>
						<th>Status</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{vagas.map((vaga) => (
						<tr key={vaga.id}>
							<td>{vaga.id}</td>
							<td>{vaga.identificador}</td>
							<td>{vaga.descricao}</td>
							<td>{vaga.status}</td>
							<td className="text-center">
								<button
									className="btn btn-sm btn-outline-primary me-2"
									onClick={() => {
										setVagaEditando(vaga);
										setModalAberto(true);
									}}
								>
									<FaEdit />
								</button>
								<button
									className="btn btn-sm btn-outline-danger"
									onClick={() => excluirVaga(vaga.id)}
								>
									<FaTrash />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{modalAberto && vagaEditando && (
				<div className="modal fade show d-block" tabIndex="-1">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Editar Vaga</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setModalAberto(false)}
								></button>
							</div>
							<div className="modal-body">
								<div className="mb-3">
									<label>Identificador</label>
									<input
										type="text"
										className="form-control"
										value={vagaEditando.identificador}
										onChange={(e) =>
											setVagaEditando({
												...vagaEditando,
												identificador: e.target.value,
											})
										}
									/>
								</div>

								<div className="mb-3">
									<label>Descrição</label>
									<select
										className="form-select"
										value={vagaEditando.descricao}
										onChange={(e) =>
											setVagaEditando({
												...vagaEditando,
												descricao: e.target.value,
											})
										}
									>
										<option value="Vaga coberta">Vaga coberta</option>
										<option value="Vaga descoberta">Vaga descoberta</option>
									</select>
								</div>

								<div className="mb-3">
									<label>Status</label>
									<select
										className="form-select"
										value={vagaEditando.status}
										onChange={(e) =>
											setVagaEditando({
												...vagaEditando,
												status: e.target.value,
											})
										}
									>
										<option value="livre">Livre</option>
										<option value="ocupada">Ocupada</option>
									</select>
								</div>
							</div>
							<div className="modal-footer">
								<button
									className="btn btn-secondary"
									onClick={() => setModalAberto(false)}
								>
									Cancelar
								</button>
								<button
									className="btn btn-primary"
									onClick={async () => {
										try {
											await api.put(
												`/vagas/editar/${vagaEditando.id}`,
												vagaEditando
											);
											alert("Vaga atualizada com sucesso!");
											setModalAberto(false);
											carregarVagas();
										} catch (error) {
											alert(
												error.response?.data?.erro || "Erro ao atualizar vaga"
											);
										}
									}}
								>
									Salvar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
