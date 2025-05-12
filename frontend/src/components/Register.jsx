import { useState } from "react";
import api from "../services/api";

export default function Register() {
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await api.post("/registrar", { nome, email, senha });
			alert("Usuário registrado com sucesso");
		} catch (error) {
			alert(error.response?.data?.erro || "Erro ao registrar");
		}
	};

	return (
		<form
			onSubmit={handleRegister}
			className="container mt-5"
			style={{ maxWidth: "400px" }}
		>
			<h2 className="mb-4 text-center">Registrar</h2>

			<div className="mb-3">
				<input
					type="text"
					placeholder="Nome"
					value={nome}
					onChange={(e) => setNome(e.target.value)}
					className="form-control"
					required
				/>
			</div>

			<div className="mb-3">
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="form-control"
					required
				/>
			</div>

			<div className="mb-3">
				<input
					type="password"
					placeholder="Senha"
					value={senha}
					onChange={(e) => setSenha(e.target.value)}
					className="form-control"
					required
				/>
			</div>

			<button type="submit" className="btn btn-success w-100">
				Registrar
			</button>
		</form>
	);
}
