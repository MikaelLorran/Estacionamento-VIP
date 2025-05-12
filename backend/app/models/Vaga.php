<?php

require_once __DIR__ . '/../core/Database.php';

class Vaga {
    private $conn;

    public function __construct() {
        $this->conn = Database::conectar();
    }

    public function listarTodas() {
        $sql = "SELECT * FROM vagas";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function listarDisponiveis() {
        $sql = "SELECT * FROM vagas WHERE status = 'livre'";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function criar($identificador, $descricao, $status) {
    $sql = "INSERT INTO vagas (identificador, descricao, status) 
            VALUES (:identificador, :descricao, :status)";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(':identificador', $identificador);
    $stmt->bindParam(':descricao', $descricao);
    $stmt->bindParam(':status', $status);

    return $stmt->execute();

    }
    
    public function ocuparVaga($vaga_id) {
    $sql = "UPDATE vagas SET status = 'ocupada' WHERE id = :vaga_id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(':vaga_id', $vaga_id);
    return $stmt->execute();
    }

}
