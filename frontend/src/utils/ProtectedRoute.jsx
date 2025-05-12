import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
	const usuario = JSON.parse(localStorage.getItem("usuario"));

	if (!usuario) {
		return <Navigate to="/" replace />;
	}

	return children;
}
