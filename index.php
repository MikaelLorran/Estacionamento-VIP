<?php
// CORS HEADERS
header("Access-Control-Allow-Origin: https://findspot.site");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


// Caminhos
require_once __DIR__ . '/backend/app/controllers/UsuarioController.php';
require_once __DIR__ . '/backend/app/controllers/ReservaController.php';
require_once __DIR__ . '/backend/app/controllers/VagaController.php';
require_once __DIR__ . '/backend/app/controllers/FaturaController.php'; 


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
    case str_ends_with($uri, '/api/login'):
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuarioController->login();
        }
        break;

    case str_ends_with($uri, '/api/registrar'):
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuarioController->registrar();
        }
        break;
    
    case str_ends_with($uri, '/api/reservar'):
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $reservaController->reservar();
        }
        break;

    case str_ends_with($uri, '/api/vagas'):
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $vagaController->listar();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $vagaController->cadastrar();
        }
        break;

    case str_ends_with($uri, '/api/vagas/gerenciar'):
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $vagaController->listarTodas();
        }
        break;


    case preg_match('/\/api\/vagas\/editar\/(\d+)/', $uri, $matches) ? true : false:
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $vagaController->atualizar($matches[1]);
        }
        break;

    case preg_match('/\/api\/vagas\/excluir\/(\d+)/', $uri, $matches) ? true : false:
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $vagaController->excluir($matches[1]);
        }
        break;

    case preg_match('/\/api\/reservas\/confirmar\/(\d+)/', $uri, $matches) ? true : false:
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $reservaController->confirmar($matches[1]);
        }
        break;

    case preg_match('/\/api\/reservas\/cancelar\/(\d+)/', $uri, $matches) ? true : false:
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $reservaController->cancelar($matches[1]);
        }
        break;
    
    case preg_match('/\/api\/reservas\/encerrar\/(\d+)/', $uri, $matches) ? true : false:
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $reservaController->encerrar($matches[1]);
        }
        break;

    case str_ends_with($uri, '/api/reservas'):
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $reservaController->listar();
        }
        break;
    
        
    case str_ends_with($uri, '/api/faturas'):
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


    case preg_match('/\/api\/faturas\/pagar\/(\d+)/', $uri, $matches) ? true : false:
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $faturaController->pagar($matches[1]);
        }
        break;

    case str_ends_with($uri, '/api/verificar-email'):
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $usuarioController->verificarEmail();
    }
    break;

    default:
        http_response_code(404);
        echo json_encode(['erro' => 'Rota não encontrada']);
        break;
}

