<?php
class Database {
    private static $conn;

    public static function conectar() {
        if (!isset(self::$conn)) {
            try {
                self::$conn = new PDO(
                    'mysql:host=localhost;dbname=u558645722_Findspot;charset=utf8mb4',
                    'u558645722_Findspot123',
                    'Findspot123'
                );

                self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            } catch (PDOException $e) {
                die('Erro de conexão: ' . $e->getMessage());
            }
        }

        return self::$conn;
    }
}
?>
