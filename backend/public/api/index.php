<?php

// CORS HEADERS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Caminhos
require_once __DIR__ . '/../../app/controllers/UsuarioController.php';
require_once __DIR__ . '/../../app/controllers/ReservaController.php';
require_once __DIR__ . '/../../app/controllers/VagaController.php';


// Captura a URI da requisição
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim($uri, '/');

// Roteamento básico
$usuarioController = new UsuarioController();
$reservaController = new ReservaController();
$vagaController = new VagaController();



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

    case str_ends_with($uri, '/reservas'):
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $reservaController->listar();
        }
        break;




    default:
        http_response_code(404);
        echo json_encode(['erro' => 'Rota não encontrada']);
        break;
}

