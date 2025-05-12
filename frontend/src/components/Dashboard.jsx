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
		<div>
			<h2>Bem-vindo, {usuario?.nome}</h2>

			<button onClick={() => navigate("/reservar")}>Reservar vaga</button>

			<button onClick={() => navigate("/reservas")}>Ver minhas reservas</button>

			<button onClick={handleLogout}>Sair</button>
		</div>
	);
}
