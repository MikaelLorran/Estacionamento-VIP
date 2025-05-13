<?php

require_once __DIR__ . '/../core/Database.php';

class Reserva {
    private $conn;

    public function __construct() {
        $this->conn = Database::conectar();
    }

    public function criar($usuario_id, $vaga_id, $data, $inicio) {
        $sql = "INSERT INTO reservas (usuario_id, vaga_id, data, horario_inicio, status) 
                VALUES (:usuario_id, :vaga_id, :data, :inicio, 'pendente')";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':usuario_id', $usuario_id);
        $stmt->bindParam(':vaga_id', $vaga_id);
        $stmt->bindParam(':data', $data);
        $stmt->bindParam(':inicio', $inicio);

        return $stmt->execute();
    }

    public function listarComDetalhes() {
        $sql = "
            SELECT r.id, u.nome AS usuario, u.id AS usuario_id, v.identificador AS vaga,
                r.data, r.horario_inicio, r.status
            FROM reservas r
            JOIN usuarios u ON r.usuario_id = u.id
            JOIN vagas v ON r.vaga_id = v.id
            ORDER BY r.data DESC, r.horario_inicio DESC
        ";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function confirmar($reserva_id) {
        $sql = "UPDATE reservas SET status = 'confirmada' WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $reserva_id);
        $stmt->execute();

        // Atualiza status da vaga
        $sqlVaga = "UPDATE vagas 
                    SET status = 'ocupada' 
                    WHERE id = (SELECT vaga_id FROM reservas WHERE id = :id)";
        $stmt2 = $this->conn->prepare($sqlVaga);
        return $stmt2->execute([':id' => $reserva_id]);
    }

    public function obterUsuarioIdDaReserva($reserva_id) {
        $sql = "SELECT usuario_id FROM reservas WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $reserva_id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['usuario_id'] ?? null;
    }

    public function cancelar($reserva_id) {
        $sql = "UPDATE reservas SET status = 'cancelada' WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $reserva_id);
        $stmt->execute();

        // Libera a vaga (status = 'livre')
        $sqlVaga = "UPDATE vagas 
                    SET status = 'livre' 
                    WHERE id = (SELECT vaga_id FROM reservas WHERE id = :id)";
        $stmt2 = $this->conn->prepare($sqlVaga);
        return $stmt2->execute([':id' => $reserva_id]);
    }


}
