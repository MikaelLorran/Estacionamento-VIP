<?php

require_once __DIR__ . '/../core/Database.php';

class Fatura {
    private $conn;

    public function __construct() {
        $this->conn = Database::conectar();
    }

    public function listarPorUsuario($usuario_id) {
        $sql = "SELECT f.id, v.identificador AS vaga, r.usuario_id, r.data_confirmacao, r.horario_inicio, 
                    r.hora_saida AS horario_saida, 
                    TIMESTAMPDIFF(MINUTE, CONCAT(r.data, ' ', r.horario_inicio), CONCAT(r.data_saida, ' ', r.hora_saida)) AS minutos,
                    f.valor, f.status
                FROM faturas f
                JOIN reservas r ON f.reserva_id = r.id
                JOIN vagas v ON r.vaga_id = v.id
                WHERE r.usuario_id = :usuario_id
                ORDER BY r.data DESC, r.horario_inicio DESC
";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':usuario_id', $usuario_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function pagar($id) {
        $sql = "UPDATE faturas SET status = 'pago' WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
