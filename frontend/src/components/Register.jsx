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
		<form onSubmit={handleRegister}>
			<h2>Registrar</h2>
			<input
				type="text"
				placeholder="Nome"
				value={nome}
				onChange={(e) => setNome(e.target.value)}
				required
			/>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Senha"
				value={senha}
				onChange={(e) => setSenha(e.target.value)}
				required
			/>
			<button type="submit">Registrar</button>
		</form>
	);
}
