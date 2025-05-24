// src/hooks/useAutoLogout.js
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const TEMPO_LIMITE = 1 * 10 * 1000;

export default function useAutoLogout() {
	const navigate = useNavigate();
	const timeoutRef = useRef(null);

	const logout = () => {
		sessionStorage.removeItem("usuario");
		toast.info("Sessão expirada por inatividade. Você foi desconectado.", {
			autoClose: false,
		});
		navigate("/login");
	};

	const resetTimer = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(logout, TEMPO_LIMITE);
	};

	useEffect(() => {
		const eventos = ["mousemove", "keydown", "scroll", "click"];

		eventos.forEach((evento) => window.addEventListener(evento, resetTimer));
		resetTimer();

		return () => {
			eventos.forEach((evento) =>
				window.removeEventListener(evento, resetTimer)
			);
			clearTimeout(timeoutRef.current);
		};
	}, []);
}
