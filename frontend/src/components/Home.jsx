import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		const usuario = JSON.parse(sessionStorage.getItem("usuario"));
		if (usuario) {
			navigate("/painel");
		}
	}, []);

	return (
		<div className="container text-center mt-5">
			<h1 className="mb-3">Bem-vindo ao Estacionamento VIP</h1>
			<p className="mb-4">Escolha uma opção para continuar:</p>
			<div className="d-flex justify-content-center gap-3">
				<button className="btn btn-primary" onClick={() => navigate("/login")}>
					Login
				</button>
				<button
					className="btn btn-success"
					onClick={() => navigate("/register")}
				>
					Registrar
				</button>
			</div>
		</div>
	);
}
