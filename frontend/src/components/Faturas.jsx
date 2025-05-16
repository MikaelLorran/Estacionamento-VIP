import { useState, useEffect } from "react";

export default function Faturas() {
	const [faturas, setFaturas] = useState([]);

	useEffect(() => {
		const dadosSimulados = [
			{
				id: 1,
				vaga: "A1",
				data: "2025-05-15",
				horario_inicio: "08:00",
				horario_saida: "10:30",
				duracao: "2h30min",
				valor: 10.0,
			},
			{
				id: 2,
				vaga: "B3",
				data: "2025-05-14",
				horario_inicio: "14:00",
				horario_saida: "15:15",
				duracao: "1h15min",
				valor: 5.0,
			},
		];

		setFaturas(dadosSimulados);
	}, []);

	return (
		<div className="container mt-5">
			<h2 className="mb-4">Minhas Faturas</h2>

			{faturas.length === 0 ? (
				<p>Nenhuma fatura encontrada.</p>
			) : (
				<table className="table table-bordered table-striped">
					<thead className="table-light">
						<tr>
							<th>ID</th>
							<th>Vaga</th>
							<th>Data</th>
							<th>Início</th>
							<th>Saída</th>
							<th>Duração</th>
							<th>Valor (R$)</th>
						</tr>
					</thead>
					<tbody>
						{faturas.map((fatura) => (
							<tr key={fatura.id}>
								<td>{fatura.id}</td>
								<td>{fatura.vaga}</td>
								<td>{fatura.data}</td>
								<td>{fatura.horario_inicio}</td>
								<td>{fatura.horario_saida}</td>
								<td>{fatura.duracao}</td>
								<td>{fatura.valor.toFixed(2).replace(".", ",")}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
