import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
	const navigate = useNavigate();
	const usuario = JSON.parse(localStorage.getItem("usuario"));

	useEffect(() => {
		if (!usuario) navigate("/");
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("usuario");
		navigate("/");
	};

	return (
		<div className="container mt-5 text-center">
			<h2 className="mb-4">Bem-vindo, {usuario?.nome}</h2>

			<div
				className="d-grid gap-3"
				style={{ maxWidth: "300px", margin: "0 auto" }}
			>
				<button
					className="btn btn-primary"
					onClick={() => navigate("/reservar")}
				>
					Reservar Vaga
				</button>
				<button
					className="btn btn-secondary"
					onClick={() => navigate("/reservas")}
				>
					Minhas Reservas
				</button>
				<button className="btn btn-outline-danger" onClick={handleLogout}>
					Sair
				</button>
			</div>
		</div>
	);
}
