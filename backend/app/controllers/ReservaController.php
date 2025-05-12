<?php

require_once __DIR__ . '/../models/Reserva.php';

class ReservaController {
    private $reservaModel;

    public function __construct() {
        $this->reservaModel = new Reserva();
    }

    public function reservar() {
        $dados = json_decode(file_get_contents("php://input"), true);

        if (!isset($dados['usuario_id'], $dados['vaga_id'], $dados['data'], $dados['inicio'], $dados['fim'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Dados incompletos']);
            return;
        }

        $sucesso = $this->reservaModel->criar(
            $dados['usuario_id'],
            $dados['vaga_id'],
            $dados['data'],
            $dados['inicio'],
            $dados['fim']
        );

        if ($sucesso) {
            echo json_encode(['mensagem' => 'Reserva realizada com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao reservar vaga']);
        }
    }
}
