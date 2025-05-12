import { useEffect, useState } from "react";
import api from "../services/api";

export default function ReservaList() {
	const [reservas, setReservas] = useState([]);

	useEffect(() => {
		const fetchReservas = async () => {
			try {
				const response = await api.get("/reservas");
				setReservas(response.data);
			} catch (error) {
				console.error("Erro ao buscar reservas:", error);
			}
		};

		fetchReservas();
	}, []);

	return (
		<div>
			<h2>Reservas Feitas</h2>
			<table border="1" cellPadding="5">
				<thead>
					<tr>
						<th>ID</th>
						<th>Usuário</th>
						<th>Vaga</th>
						<th>Data</th>
						<th>Início</th>
						<th>Fim</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{reservas.map((r) => (
						<tr key={r.id}>
							<td>{r.id}</td>
							<td>{r.usuario}</td>
							<td>{r.vaga}</td>
							<td>{r.data}</td>
							<td>{r.horario_inicio}</td>
							<td>{r.horario_fim}</td>
							<td>{r.status}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
