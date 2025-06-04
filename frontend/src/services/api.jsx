import axios from "axios";

const api = axios.create({
	baseURL: "https://corsproxy.io/?https://findspot.free.nf/backend/public/api",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
