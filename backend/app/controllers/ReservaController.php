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
            // Atualiza o status da vaga para "ocupada"
            require_once __DIR__ . '/../models/Vaga.php';
            $vagaModel = new Vaga();
            $vagaModel->ocuparVaga($dados['vaga_id']);

            echo json_encode(['mensagem' => 'Reserva realizada e vaga ocupada com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao reservar vaga']);
        }
    }

    public function listar() {
        $reservas = $this->reservaModel->listarComDetalhes();
        echo json_encode($reservas);
    }

}
