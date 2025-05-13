<?php

require_once __DIR__ . '/../models/Usuario.php';

class UsuarioController
{
    private $usuarioModel;

    public function __construct()
    {
        $this->usuarioModel = new Usuario();
    }

    // Registro de novo usuário
    public function registrar()
    {
        $dados = json_decode(file_get_contents("php://input"), true);

        if (!isset($dados['nome'], $dados['email'], $dados['senha'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Dados incompletos']);
            return;
        }

        $sucesso = $this->usuarioModel->criar($dados['nome'], $dados['email'], $dados['senha']);

        if ($sucesso) {
            echo json_encode(['mensagem' => 'Usuário registrado com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao registrar o usuário']);
        }
    }

    // Login de usuário
    public function login()
    {
        $dados = json_decode(file_get_contents("php://input"), true);

        if (!isset($dados['email'], $dados['senha'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Dados incompletos']);
            return;
        }

        $usuario = $this->usuarioModel->autenticar($dados['email'], $dados['senha']);

        if ($usuario) {
            session_start();
            $_SESSION['usuario'] = $usuario;

            echo json_encode([
                'mensagem' => 'Login realizado com sucesso',
                'usuario' => [
                    'id' => $usuario['id'],
                    'nome' => $usuario['nome'],
                    'email' => $usuario['email'],
                    'is_admin' => $usuario['is_admin']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['erro' => 'Credenciais inválidas']);
        }
    }
}
