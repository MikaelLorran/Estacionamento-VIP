<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


// Caminhos
require_once __DIR__ . '/../../app/controllers/UsuarioController.php';
require_once __DIR__ . '/../../app/controllers/ReservaController.php';
require_once __DIR__ . '/../../app/controllers/VagaController.php';
require_once __DIR__ . '/../../app/controllers/FaturaController.php'; 


// Captura a URI da requisição
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim($uri, '/');

// Roteamento básico
$usuarioController = new UsuarioController();
$reservaController = new ReservaController();
$vagaController = new VagaController();
$faturaController = new FaturaController();

$rota = basename($uri);

switch (true) {
    case str_ends_with($uri, '/login'):
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuarioController->login();
        }
        break;

    case str_ends_with($uri, '/registrar'):
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuarioController->registrar();
        }
        break;
    
    case str_ends_with($uri, '/reservar'):
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $reservaController->reservar();
        }
        break;

    case str_ends_with($uri, '/vagas'):
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $vagaController->listar();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $vagaController->cadastrar();
        }
        break;

    case str_ends_with($uri, '/gerenciar'):
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $vagaController->listarTodas();
        }
        break;


    case preg_match('/\/vagas\/editar\/(\d+)/', $uri, $matches) ? true : false:
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $vagaController->atualizar($matches[1]);
        }
        break;

    case preg_match('/\/vagas\/excluir\/(\d+)/', $uri, $matches) ? true : false:
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $vagaController->excluir($matches[1]);
        }
        break;

    case preg_match('/\/reservas\/confirmar\/(\d+)/', $uri, $matches) ? true : false:
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $reservaController->confirmar($matches[1]);
        }
        break;

    case preg_match('/\/reservas\/cancelar\/(\d+)/', $uri, $matches) ? true : false:
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $reservaController->cancelar($matches[1]);
        }
        break;
    
    case preg_match('/\/reservas\/encerrar\/(\d+)/', $uri, $matches) ? true : false:
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $reservaController->encerrar($matches[1]);
        }
        break;

    case str_ends_with($uri, '/reservas'):
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $reservaController->listar();
        }
        break;
    
        
    case str_ends_with($uri, '/faturas'):
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            session_start();
            $usuario_id = $_SESSION['usuario']['id'] ?? null;

            if (!$usuario_id) {
                http_response_code(401);
                echo json_encode(['erro' => 'Usuário não autenticado']);
                return;
            }

            $faturaController->listarPorUsuario($usuario_id);
        }
        break;


    case preg_match('/\/faturas\/pagar\/(\d+)/', $uri, $matches) ? true : false:
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $faturaController->pagar($matches[1]);
        }
        break;

    case str_ends_with($uri, '/verificar-email'):
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $usuarioController->verificarEmail();
    }
    break;

    default:
        http_response_code(404);
        echo json_encode(['erro' => 'Rota não encontrada']);
        break;
}

