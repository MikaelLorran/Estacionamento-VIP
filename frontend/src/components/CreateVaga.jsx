import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAutoLogout from "../utils/UseAutoLogout";

export default function CreateVaga() {
	useAutoLogout();
	const [identificador, setIdentificador] = useState("");
	const [descricao, setDescricao] = useState("");
	const [status, setStatus] = useState("livre");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await api.post("/vagas", { identificador, descricao, status });
			toast.success("Vaga cadastrada com sucesso!");

			// Redireciona após 1,5s
			setTimeout(() => {
				navigate("/vagas/gerenciar");
			}, 1500);
		} catch (error) {
			toast.error("Erro ao cadastrar vaga", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="container mt-5"
			style={{ maxWidth: "500px" }}
		>
			<h2 className="mb-4 text-center">Cadastrar Vaga</h2>

			<div className="mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Identificador"
					value={identificador}
					onChange={(e) => setIdentificador(e.target.value)}
					required
				/>
			</div>

			<div className="mb-3">
				<select
					className="form-select"
					value={descricao}
					onChange={(e) => setDescricao(e.target.value)}
					required
				>
					<option value="">Tipo de vaga</option>
					<option value="Vaga coberta">Vaga coberta</option>
					<option value="Vaga descoberta">Vaga descoberta</option>
				</select>
			</div>

			<div className="mb-4">
				<select
					className="form-select"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<option value="livre">Livre</option>
					<option value="ocupada">Ocupada</option>
					<option value="reservada">Reservada</option>
				</select>
			</div>

			<button
				type="submit"
				className="btn btn-primary w-100"
				disabled={loading}
			>
				{loading ? "Aguarde..." : "Cadastrar"}
			</button>
		</form>
	);
}
