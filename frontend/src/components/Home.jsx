import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();

	return (
		<div style={{ textAlign: "center", paddingTop: "40px" }}>
			<h1>Bem-vindo ao Estacionamento VIP</h1>
			<p>Escolha uma opção para continuar:</p>
			<button onClick={() => navigate("/login")}>Login</button>
			<button
				onClick={() => navigate("/register")}
				style={{ marginLeft: "10px" }}
			>
				Registrar
			</button>
		</div>
	);
}
