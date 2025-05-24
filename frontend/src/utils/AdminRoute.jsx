import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
	const usuario = JSON.parse(sessionStorage.getItem("usuario"));

	if (!usuario || usuario.is_admin !== 1) {
		return <Navigate to="/painel" replace />;
	}

	return children;
}
