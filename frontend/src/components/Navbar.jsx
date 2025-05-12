import { useNavigate } from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();
	const usuario = JSON.parse(localStorage.getItem("usuario"));

	const handleLogout = () => {
		localStorage.removeItem("usuario");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<span
					className="navbar-brand"
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/")}
				>
					Estacionamento VIP
				</span>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{usuario && (
							<>
								<li className="nav-item">
									<span
										className="nav-link"
										onClick={() => navigate("/reservar")}
									>
										Reservar
									</span>
								</li>
								<li className="nav-item">
									<span
										className="nav-link"
										onClick={() => navigate("/reservas")}
									>
										Minhas Reservas
									</span>
								</li>
								{usuario?.is_admin === 1 && (
									<li className="nav-item dropdown">
										<span
											className="nav-link dropdown-toggle"
											role="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
											style={{ cursor: "pointer" }}
										>
											Vagas
										</span>
										<ul className="dropdown-menu">
											<li>
												<span
													className="dropdown-item"
													onClick={() => navigate("/vagas/nova")}
												>
													Cadastrar Vaga
												</span>
											</li>
											<li>
												<span
													className="dropdown-item"
													onClick={() => navigate("/vagas/gerenciar")}
												>
													Visualizar Vagas
												</span>
											</li>
										</ul>
									</li>
								)}
							</>
						)}
					</ul>

					<ul className="navbar-nav">
						{usuario ? (
							<>
								<li className="nav-item">
									<span className="nav-link text-light">
										Olá, {usuario.nome}
									</span>
								</li>
								<li className="nav-item">
									<button
										className="btn btn-outline-light ms-2"
										onClick={handleLogout}
									>
										Sair
									</button>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<button
										className="btn btn-outline-light me-2"
										onClick={() => navigate("/login")}
									>
										Login
									</button>
								</li>
								<li className="nav-item">
									<button
										className="btn btn-outline-success"
										onClick={() => navigate("/register")}
									>
										Registrar
									</button>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
