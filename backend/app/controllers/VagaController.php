<?php

require_once __DIR__ . '/../models/Vaga.php';

class VagaController {
    private $vagaModel;

    public function __construct() {
        $this->vagaModel = new Vaga();
    }

    public function listar() {
        $vagas = $this->vagaModel->listarDisponiveis();
        echo json_encode($vagas);
    }
    
    public function cadastrar() {
    $dados = json_decode(file_get_contents("php://input"), true);

    if (!isset($dados['identificador'], $dados['descricao'], $dados['status'])) {
        http_response_code(400);
        echo json_encode(['erro' => 'Dados incompletos']);
        return;
    }

    $sucesso = $this->vagaModel->criar(
        $dados['identificador'],
        $dados['descricao'],
        $dados['status']
    );

    if ($sucesso) {
        echo json_encode(['mensagem' => 'Vaga cadastrada com sucesso']);
    } else {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao cadastrar vaga']);
    }
}

}
