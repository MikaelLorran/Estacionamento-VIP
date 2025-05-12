import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post("/login", { email, senha });
			alert(`Bem-vindo, ${response.data.usuario.nome}`);
			localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
			navigate("/painel");
		} catch (error) {
			alert(error.response?.data?.erro || "Erro ao fazer login");
		}
	};

	return (
		<form
			onSubmit={handleLogin}
			className="container mt-5"
			style={{ maxWidth: "400px" }}
		>
			<h2 className="mb-4 text-center">Login</h2>

			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="form-control mb-3"
				required
			/>

			<input
				type="password"
				placeholder="Senha"
				value={senha}
				onChange={(e) => setSenha(e.target.value)}
				className="form-control mb-3"
				required
			/>

			<button type="submit" className="btn btn-primary w-100">
				Entrar
			</button>
		</form>
	);
}
