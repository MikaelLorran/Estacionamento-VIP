import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Reserve from "./components/Reserve";
import ReservaList from "./components/ReservaList";
import CreateVaga from "./components/CreateVaga";
import ProtectedRoute from "./utils/ProtectedRoute";

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
				<Route
					path="/vagas/nova"
					element={
						<ProtectedRoute>
							<CreateVaga />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
