import { useState } from "react";
import api from "../services/api";

export default function Login() {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post("/login", { email, senha });
			alert(`Bem-vindo, ${response.data.usuario.nome}`);
			localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
		} catch (error) {
			alert(error.response?.data?.erro || "Erro ao fazer login");
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<h2>Login</h2>
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
			<button type="submit">Entrar</button>
		</form>
	);
}
