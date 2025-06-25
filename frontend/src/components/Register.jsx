import { useState } from "react";
import api from "../services/api";
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";

export default function Register() {
	const [form, setForm] = useState({
		nome: "",
		email: "",
		senha: "",
		confirmarSenha: "",
		cpf: "",
		telefone: "",
	});

	const [senhaValida, setSenhaValida] = useState(false);
	const [senhasIguais, setSenhasIguais] = useState(true);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));

		if (name === "senha") {
			setSenhaValida(validarSenha(value));
			setSenhasIguais(value === form.confirmarSenha);
		} else if (name === "confirmarSenha") {
			setSenhasIguais(value === form.senha);
		}
	};

	const validarSenha = (senha) => {
		return senha.length >= 8 && /\d/.test(senha);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!senhaValida) {
			toast.error("A senha deve ter no mínimo 8 caracteres e conter números.");
			return;
		}

		if (!senhasIguais) {
			toast.error("As senhas não coincidem.");
			return;
		}

		try {
			const verifica = await api.post(
				"http://localhost/Estacionamento/backend/public/api/verificar-email",
				{ email: form.email }
			);

			if (!verifica.data.disponivel) {
				toast.error("Este e-mail já está em uso.");
				return;
			}

			await api.post(
				"http://localhost/Estacionamento/backend/public/api/registrar",
				form
			);
			toast.success("Cadastro realizado com sucesso!");
		} catch (error) {
			toast.error("Erro ao cadastrar usuário.", error);
		}
	};

	return (
		<div className="container mt-5">
			<h2>Cadastro de Usuário</h2>
			<form onSubmit={handleSubmit} className="row g-3">
				<div className="col-md-6">
					<label>Nome</label>
					<input
						className="form-control"
						name="nome"
						onChange={handleChange}
						required
					/>
				</div>

				<div className="col-md-6">
					<label>Email</label>
					<input
						type="email"
						className="form-control"
						name="email"
						onChange={handleChange}
						required
					/>
				</div>

				<div className="col-md-6">
					<label>Senha</label>
					<input
						type="password"
						className={`form-control ${
							form.senha && !senhaValida ? "is-invalid" : ""
						}`}
						name="senha"
						onChange={handleChange}
						required
					/>
					{form.senha && !senhaValida && (
						<div className="text-danger">
							Senha deve ter no mínimo 8 caracteres e conter números.
						</div>
					)}
				</div>

				<div className="col-md-6">
					<label>Confirmar Senha</label>
					<input
						type="password"
						className={`form-control ${
							form.confirmarSenha && !senhasIguais ? "is-invalid" : ""
						}`}
						name="confirmarSenha"
						onChange={handleChange}
						required
					/>
					{form.confirmarSenha && !senhasIguais && (
						<div className="text-danger">As senhas não coincidem.</div>
					)}
				</div>

				<div className="col-md-6">
					<label>CPF</label>
					<IMaskInput
						mask="000.000.000-00"
						className="form-control"
						name="cpf"
						onAccept={(value) => setForm((prev) => ({ ...prev, cpf: value }))}
						required
					/>
				</div>

				<div className="col-md-6">
					<label>Telefone</label>
					<IMaskInput
						mask="(00) 00000-0000"
						className="form-control"
						name="telefone"
						onAccept={(value) =>
							setForm((prev) => ({ ...prev, telefone: value }))
						}
						required
					/>
				</div>

				<div className="col-12">
					<button className="btn btn-success">Cadastrar</button>
				</div>
			</form>
		</div>
	);
}
