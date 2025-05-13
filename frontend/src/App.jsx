import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminRoute from "./utils/AdminRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Reserve from "./components/Reserve";
import ReservaList from "./components/ReservaList";
import CreateVaga from "./components/CreateVaga";
import GerenciarVagas from "./components/GerenciarVagas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route
					path="/painel"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/vagas/nova"
					element={
						<AdminRoute>
							<CreateVaga />
						</AdminRoute>
					}
				/>

				<Route
					path="/vagas/gerenciar"
					element={
						<AdminRoute>
							<GerenciarVagas />
						</AdminRoute>
					}
				/>

				<Route
					path="/reservar"
					element={
						<ProtectedRoute>
							<Reserve />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/reservas"
					element={
						<ProtectedRoute>
							<ReservaList />
						</ProtectedRoute>
					}
				/>
			</Routes>

			<ToastContainer position="top-center" autoClose={2000} />
		</BrowserRouter>
	);
}

export default App;
