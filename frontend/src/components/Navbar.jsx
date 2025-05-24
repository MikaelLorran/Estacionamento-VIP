import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();
	const usuario = JSON.parse(sessionStorage.getItem("usuario"));

	const handleLogout = () => {
		sessionStorage.removeItem("usuario");
		navigate("/login");
	};

	return (
		<nav
			className="navbar navbar-expand-lg shadow px-4 py-3"
			style={{ backgroundColor: "#f2f2f2" }}
		>
			<div className="container-fluid">
				<Link className="navbar-brand" to="/painel">
					<img src="/logo.png" alt="Logo" height="40" />
				</Link>

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
										style={{ cursor: "pointer" }}
									>
										Reservar
									</span>
								</li>
								<li className="nav-item">
									<span
										className="nav-link"
										onClick={() => navigate("/reservas")}
										style={{ cursor: "pointer" }}
									>
										Minhas Reservas
									</span>
								</li>
								<li className="nav-item">
									<span
										className="nav-link"
										onClick={() => navigate("/faturas")}
										style={{ cursor: "pointer" }}
									>
										Minhas Faturas
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
													style={{ cursor: "pointer" }}
												>
													Cadastrar Vaga
												</span>
											</li>
											<li>
												<span
													className="dropdown-item"
													onClick={() => navigate("/vagas/gerenciar")}
													style={{ cursor: "pointer" }}
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
								<li className="nav-item d-flex align-items-center">
									<span className="nav-link text-dark">
										Olá, {usuario.nome}
									</span>
								</li>
								<li className="nav-item">
									<button
										className="btn btn-outline-danger ms-2"
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
										className="btn btn-outline-secondary me-2"
										onClick={() => navigate("/login")}
									>
										Login
									</button>
								</li>
								<li className="nav-item">
									<button
										className="btn btn-success"
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
