import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAutoLogout from "../utils/UseAutoLogout";

export default function Dashboard() {
	useAutoLogout();
	const navigate = useNavigate();
	const usuario = JSON.parse(sessionStorage.getItem("usuario"));

	useEffect(() => {
		if (!usuario) navigate("/");
	}, []);

	const handleLogout = () => {
		sessionStorage.removeItem("usuario");
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
					className="btn btn-primary"
					onClick={() => navigate("/reservas")}
				>
					Minhas Reservas
				</button>
				<button
					className="btn btn-primary"
					onClick={() => navigate("/faturas")}
				>
					Minhas Faturas
				</button>
				{usuario?.is_admin === 1 && (
					<button
						className="btn btn-primary"
						onClick={() => navigate("/vagas/nova")}
					>
						Cadastrar Vaga
					</button>
				)}
				{usuario?.is_admin === 1 && (
					<button
						className="btn btn-primary"
						onClick={() => navigate("/vagas/gerenciar")}
					>
						Visualizar Vagas
					</button>
				)}
				<button className="btn btn-outline-danger" onClick={handleLogout}>
					Sair
				</button>
			</div>
		</div>
	);
}
