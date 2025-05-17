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
            $this->chamarESP32Reservada($vaga_id);
        }

        return $sucesso;
    }

    private function chamarESP32Reservada($vaga_id) {
        $ips = [
            1 => 'http://192.168.69.251/reservar',
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
            SELECT 
                r.id AS reserva_id,
                u.nome AS usuario,
                u.id AS usuario_id,
                v.identificador AS vaga,
                r.data,
                r.horario_inicio,
                r.status
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

        $sqlVaga = "UPDATE vagas 
                    SET status = 'ocupada' 
                    WHERE id = (SELECT vaga_id FROM reservas WHERE id = :id)";
        $stmt2 = $this->conn->prepare($sqlVaga);
        $stmt2->execute([':id' => $reserva_id]);

        $vaga_id = $this->obterVagaIdDaReserva($reserva_id);
        $this->chamarESP32Confirmacao($vaga_id);

        return true;
    }

    public function cancelar($reserva_id) {
        $sql = "UPDATE reservas SET status = 'cancelada' WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $reserva_id);
        $sucessoReserva = $stmt->execute();

        if (!$sucessoReserva) return false;

        $sqlVaga = "UPDATE vagas 
                    SET status = 'livre' 
                    WHERE id = (SELECT vaga_id FROM reservas WHERE id = :id)";
        $stmt2 = $this->conn->prepare($sqlVaga);
        $sucessoVaga = $stmt2->execute([':id' => $reserva_id]);

        if (!$sucessoVaga) return false;

        $vaga_id = $this->obterVagaIdDaReserva($reserva_id);
        $this->chamarESP32Cancelar($vaga_id);

        return true;
    }

    private function buscarReservaPorId($id) {
        $sql = "SELECT * FROM reservas WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }


    private function calcularDuracaoEmHoras($data_inicio, $hora_inicio, $data_saida, $hora_saida) {
        $inicio = new DateTime("$data_inicio $hora_inicio");
        $fim = new DateTime("$data_saida $hora_saida");

        $diferenca = $inicio->diff($fim);
        $totalHoras = (($diferenca->days * 24) + $diferenca->h)- 1;

        return $totalHoras;
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

        if ($sucesso) {
            $sqlVaga = "UPDATE vagas 
                        SET status = 'livre'
                        WHERE id = (SELECT vaga_id FROM reservas WHERE id = :id)";
            $stmt2 = $this->conn->prepare($sqlVaga);
            $stmt2->execute([':id' => $reserva_id]);

            $vaga_id = $this->obterVagaIdDaReserva($reserva_id);
            $this->chamarESP32Livre($vaga_id);

            $reserva = $this->buscarReservaPorId($reserva_id);

            $data_inicio = $reserva['data_confirmacao'];
            $hora_inicio = $reserva['hora_confirmacao'];
            $data_saida = $reserva['data_saida'];
            $hora_saida = $reserva['hora_saida'];

            $horas = $this->calcularDuracaoEmHoras($data_inicio, $hora_inicio, $data_saida, $hora_saida);
            $valor = 20 + ($horas * 5); 

            $sqlFatura = "INSERT INTO faturas (reserva_id, valor, status, data_geracao)
                        VALUES (:reserva_id, :valor, 'pendente', NOW())";
            $stmtFatura = $this->conn->prepare($sqlFatura);
            $stmtFatura->execute([
                ':reserva_id' => $reserva_id,
                ':valor' => $valor
            ]);

        }

        return $sucesso;
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
            1 => 'http://192.168.69.251/liberar',
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

    private function chamarESP32Livre($vaga_id) {
        $ips = [
            1 => 'http://192.168.69.251/livre',
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

    private function chamarESP32Cancelar($vaga_id) {
        $ips = [
            1 => 'http://192.168.69.251/cancelar',
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

    public function obterUsuarioIdDaReserva($reserva_id) {
        $sql = "SELECT usuario_id FROM reservas WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $reserva_id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['usuario_id'] ?? null;
    }

}
