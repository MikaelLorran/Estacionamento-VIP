<?php

require_once __DIR__ . '/../models/Fatura.php';

class FaturaController {
    private $faturaModel;

    public function __construct() {
        $this->faturaModel = new Fatura();
    }

    private function iniciarSessaoSeNecessario() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function listarPorUsuario() {
        $this->iniciarSessaoSeNecessario();

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $usuario_id = $_SESSION['usuario']['id'] ?? null;

        if (!$usuario_id) {
            http_response_code(401);
            echo json_encode(['erro' => 'Usuário não autenticado']);
            return;
        }

        $faturas = $this->faturaModel->listarPorUsuario($usuario_id);
        echo json_encode($faturas);

    }

    public function pagar($id) {
        $this->iniciarSessaoSeNecessario();

        if (!isset($_SESSION['usuario']['id'])) {
            http_response_code(401);
            echo json_encode(['erro' => 'Usuário não autenticado']);
            return;
        }

        $sucesso = $this->faturaModel->pagar($id);

        if ($sucesso) {
            echo json_encode(['mensagem' => 'Fatura paga com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao pagar fatura']);
        }
    }
}
