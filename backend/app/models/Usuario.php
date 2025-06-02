<?php

require_once __DIR__ . '/../core/Database.php';

class Usuario
{
    private $conn;

    public function __construct()
    {
        $this->conn = Database::conectar();
    }

    public function criar($nome, $email, $senha, $cpf, $telefone)
    {
        $sql = "INSERT INTO usuarios (nome, email, senha, CPF, telefone)
                VALUES (:nome, :email, :senha, :cpf, :telefone)";

        $stmt = $this->conn->prepare($sql);
        $senhaHash = password_hash($senha, PASSWORD_BCRYPT);

        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senhaHash);
        $stmt->bindParam(':cpf', $cpf);
        $stmt->bindParam(':telefone', $telefone);

        return $stmt->execute();
    }


    public function buscarPorEmail($email)
    {
        $sql = "SELECT * FROM usuarios WHERE email = :email LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function autenticar($email, $senha)
    {
        $usuario = $this->buscarPorEmail($email);

        if ($usuario && password_verify($senha, $usuario['senha'])) {
            return $usuario;
        }

        return false;
    }
}
