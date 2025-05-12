import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Reserve from "./components/Reserve";
import CreateVaga from "./components/CreateVaga";
import ReservaList from "./components/ReservaList";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./components/Dashboard";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/registrar" element={<Register />} />
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
				<Route path="/vagas/nova" element={<CreateVaga />} />
				<Route path="/reservas" element={<ReservaList />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
