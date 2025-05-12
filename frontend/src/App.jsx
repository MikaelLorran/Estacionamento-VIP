import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reserve from "./components/Reserve";
import CreateVaga from "./components/CreateVaga";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/reservar" element={<Reserve />} />
				<Route path="/vagas/nova" element={<CreateVaga />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
