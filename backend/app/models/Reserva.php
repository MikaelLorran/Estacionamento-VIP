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

        $sucesso = $stmt->execute();

            if ($sucesso) {
                $this->chamarESP32Reservada($vaga_id);;
            }

            return $sucesso;
        }

        private function chamarESP32Reservada($vaga_id) {
            $ips = [
                1 => 'http://192.168.1.19/reservar',
                // outros se tiver
            ];

            if (!isset($ips[$vaga_id])) return;

            try {
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $ips[$vaga_id]);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
                curl_exec($ch);
                curl_close($ch);
            } catch (Exception $e) {}
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
        $sql = "UPDATE reservas 
        SET status = 'confirmada',
            data_confirmacao = CURDATE(),
            hora_confirmacao = CURTIME()
        WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $reserva_id);
        $stmt->execute();

        // Atualiza status da vaga
        $sqlVaga = "UPDATE vagas 
                    SET status = 'ocupada' 
                    WHERE id = (SELECT vaga_id FROM reservas WHERE id = :id)";
        $stmt2 = $this->conn->prepare($sqlVaga);
        $stmt2->execute([':id' => $reserva_id]);

        // Obtem o ID da vaga
        $vaga_id = $this->obterVagaIdDaReserva($reserva_id);
        $this->chamarESP32Confirmacao($vaga_id);

        return true;
    }

    private function obterVagaIdDaReserva($reserva_id) {
        $sql = "SELECT vaga_id FROM reservas WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $reserva_id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['vaga_id'] ?? null;
    }

    private function chamarESP32Confirmacao($vaga_id) {
        $ips = [
            1 => 'http://192.168.1.19/liberar',
        ];

        if (!isset($ips[$vaga_id])) return;

        try {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $ips[$vaga_id]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
            curl_exec($ch);
            curl_close($ch);
        } catch (Exception $e) {

        }
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
        $stmt2->execute([':id' => $reserva_id]);
        $vaga_id = $this->obterVagaIdDaReserva($reserva_id);
        $this->chamarESP32Livre($vaga_id);

        return true;
    }

    private function chamarESP32Livre($vaga_id) {
        $ips = [
            1 => 'http://192.168.1.19/livre',
            // ...
        ];

        if (!isset($ips[$vaga_id])) return;

        try {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $ips[$vaga_id]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
            curl_exec($ch);
            curl_close($ch);
        } catch (Exception $e) {}
    }

    public function encerrar($reserva_id) {
        $sql = "UPDATE reservas 
                SET status = 'encerrada',
                    data_saida = CURDATE(),
                    hora_saida = CURTIME()
                WHERE id = :id AND status = 'confirmada'";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $reserva_id);
        $sucesso = $stmt->execute();

        // Atualiza status da vaga para 'livre'
        if ($sucesso) {
            $sqlVaga = "UPDATE vagas 
                        SET status = 'livre'
                        WHERE id = (SELECT vaga_id FROM reservas WHERE id = :id)";
            $stmt2 = $this->conn->prepare($sqlVaga);
            $stmt2->execute([':id' => $reserva_id]);

            // Comando para ESP
            $vaga_id = $this->obterVagaIdDaReserva($reserva_id);
            $this->chamarESP32Livre($vaga_id);
        }

        return $sucesso;
    }



}
