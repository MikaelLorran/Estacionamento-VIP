<?php

require_once __DIR__ . '/../core/Database.php';

class Reserva {
    private $conn;

    public function __construct() {
        $this->conn = Database::conectar();
    }

    public function criar($usuario_id, $vaga_id, $data, $inicio, $fim) {
        $sql = "INSERT INTO reservas (usuario_id, vaga_id, data, horario_inicio, horario_fim) 
                VALUES (:usuario_id, :vaga_id, :data, :inicio, :fim)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':usuario_id', $usuario_id);
        $stmt->bindParam(':vaga_id', $vaga_id);
        $stmt->bindParam(':data', $data);
        $stmt->bindParam(':inicio', $inicio);
        $stmt->bindParam(':fim', $fim);

        return $stmt->execute();
    }
}
