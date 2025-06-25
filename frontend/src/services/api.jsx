import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost/Estacionamento/backend/public/api",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
