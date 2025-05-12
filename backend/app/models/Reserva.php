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

    public function listarComDetalhes() {
        $sql = "
            SELECT r.id, u.nome AS usuario, v.identificador AS vaga, r.data, 
                r.horario_inicio, r.horario_fim, r.status
            FROM reservas r
            JOIN usuarios u ON r.usuario_id = u.id
            JOIN vagas v ON r.vaga_id = v.id
            ORDER BY r.data DESC, r.horario_inicio DESC
        ";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
